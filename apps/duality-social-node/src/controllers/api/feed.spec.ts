
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import sizeOf from 'image-size';
import { Upload } from '@aws-sdk/lib-storage';
import feedRouter, { FeedController, FeedControllerInstance } from './feed.ts';
import { ISignedToken } from '../../interfaces/signed-token.ts';
import { getAuthToken } from '../../fixtures/auth.ts';
import { getUserDoc, makeUser } from '../../fixtures/user.ts';
import { MulterRequest } from '../../interfaces/multer-request.ts';
import { FeedService } from '../../services/feed.ts';
import { AppConstants, HumanityTypeEnum, IPost, IPostViewpoint, IRole, IRoleDocument, IUser, IUserDocument, PostModel, PostViewpointModel, RoleModel, UserModel } from '@duality-social/duality-social-lib';

import { Types } from 'mongoose';
import { RequestUserService } from '../../services/request-user.ts';
import { Readable } from 'stream';

jest.mock('image-size');

jest.mock('@aws-sdk/lib-storage', () => ({
    Upload: jest.fn().mockImplementation(() => ({
        done: jest.fn().mockResolvedValue({ Location: 'https://mock-s3-url.com/mock-image.jpg' }),
    })),
}));

jest.mock('@duality-social/duality-social-lib', () => {
    const originalModule = jest.requireActual('@duality-social/duality-social-lib');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { makePost } = require('../../fixtures/post');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { makePostViewpoint } = require('../../fixtures/post-viewpoint');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { makeRole } = require('../../fixtures/role');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { makeUser, getUserDoc } = require('../../fixtures/user');

    class PostModel {
        constructor(postData: IPost) {
            const postDoc = makePost(postData);
            Object.assign(this, postDoc);
        }

        save() {
            return Promise.resolve({_id: new Types.ObjectId(), ...this});
        }

        static create = jest.fn((postData: IPost) => {
            return Promise.resolve(makePost(postData));
        });

        static findById() {
            return jest.fn();
        }

        static find() {
            return jest.fn();
        }
    }

    class PostViewpointModel {
        constructor(viewpointData: IPostViewpoint) {
            const viewpointDoc = makePostViewpoint(viewpointData);
            Object.assign(this, viewpointDoc);
        }


        save() {
            return Promise.resolve({_id: new Types.ObjectId(), ...this});
        }

        static create = jest.fn((viewpointData: IPostViewpoint) => {
            return Promise.resolve(makePostViewpoint(viewpointData));
        });
    }

    class UserModel {
        constructor(userData: IUser) {
            Object.assign(this, getUserDoc(makeUser(userData)));
        }

        validateSync() {
            return null;
        }

        static create = jest.fn((userData: IUser) => {
            return Promise.resolve(getUserDoc(makeUser(userData)));
        });

        static findById() {
            return jest.fn();
        }

        static find() {
            return jest.fn();
        }
    }

    class RoleModel {
        constructor(roleData: IRole) {
            const roleDoc = makeRole(roleData);
            Object.assign(this, roleDoc);
        }

        static find = jest.fn(() => {
            const userId = new Types.ObjectId();
            return Promise.resolve([
                makeRole({ users: [userId], admin: true, member: false }),
                makeRole({ users: [userId], admin: false, member: true })
            ]);
        });
    }

    const AppConstants = {
        EmailTokenExpiration: 24 * 60 * 60 * 1000,
        EmailTokenLength: 32,
        BcryptRounds: 10,
        JwtAlgo: 'HS256',
        JwtExpiration: 86400,
        UsernameRegex: /^[A-Za-z0-9]{3,30}$/,
        UsernameRegexError: 'Username must be 3-30 characters long and contain only letters and numbers',
        PasswordRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
        PasswordRegexError: 'Password must be at least 8 characters long and include at least one letter, one number, and one special character (!@#$%^&*()_+-=[]{};\':"|,.<>/?)',
        EmailTokenResendInterval: 5 * 60 * 1000, // 5 minutes
        ApplicationName: 'Duality Social',
        EmailSender: "noreply@duality.social",
        EmailFrom: 'Duality Social <noreply@duality.social>',
        MaxPostLength: 280,
        MaxBlogPostLength: 1000,
        MaxPostImages: 4,
        MaxImageSize: 5 * 1024 * 1024, // 5 MB
        MaxImageDimensions: { width: 1920, height: 1080 },
    };

    return {
        ...originalModule,
        PostModel,
        PostViewpointModel,
        UserModel,
        RoleModel,
        AppConstants,
    };
});

jest.mock('../../middlewares/authenticate-token', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { makeUser, getUserDoc } = require('../../fixtures/user');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { makeRole } = require('../../fixtures/role');
    const userDoc: IUserDocument = getUserDoc(makeUser());
    const roles: IRoleDocument[] = [
        makeRole({ users: [userDoc._id], admin: true, member: false }),
        makeRole({ users: [userDoc._id], admin: false, member: true })
    ]; 
    return ({
        authenticateToken: (req: Request, res: Response, next: NextFunction) => {
            const token = req.get('Authorization')?.split(' ')[1] || req.header('Authorization')?.split(' ')[1];
            if (token) {
                req.user = RequestUserService.makeRequestUser(userDoc, roles);
                next();
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }
        },
    })
});

jest.mock('franc', () => ({
    franc: jest.fn(() => 'en'), // Always returns 'en' for language detection
}));

const app = express();
app.use(bodyParser.json());
app.use('/api/feed', feedRouter);

describe('FeedController - newPost', () => {
    let authToken: ISignedToken;
    let feedController: FeedController;

    beforeAll(async () => {
        //authToken = { token: 'valid-token', tokenUser: { userId: 'user-id', roles: []}, roleNames: [], roles: [] };
        authToken = await getAuthToken(getUserDoc(makeUser()));
        feedController = FeedControllerInstance;
    });

    describe('new post validation', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        });
        it('should return 401 if no token is provided', async () => {
            const response = await request(app)
                .post('/api/feed')
                .send({
                    isBlogPost: 'true',
                    content: 'This is a test post',
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        });

        it('should return 400 if isBlogPost is missing', async () => {
            const response = await request(app)
                .post('/api/feed')
                .auth(authToken.token, { type: 'bearer' })
                .send({
                    content: 'This is a test post',
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        msg: 'isBlogPost is required',
                    }),
                ])
            );
        });

        it('should return 400 if isBlogPost is not "true" or "false"', async () => {
            const response = await request(app)
                .post('/api/feed')
                .auth(authToken.token, { type: 'bearer' })
                .send({
                    isBlogPost: 'maybe',
                    content: 'This is a test post',
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        msg: 'isBlogPost must be either "true" or "false"',
                    }),
                ])
            );
        });

        it('should return 400 if content is missing', async () => {
            const response = await request(app)
                .post('/api/feed')
                .auth(authToken.token, { type: 'bearer' })
                .send({
                    isBlogPost: 'true',
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        msg: 'Content is required',
                    }),
                ])
            );
        });

        it('should return 201 if all required fields are present and valid', async () => {
            const mockNewPost = jest.fn().mockResolvedValue({ message: 'Post created successfully' });
            jest.spyOn(FeedService.prototype, 'newPost').mockImplementation(mockNewPost);

            const response = await request(app)
                .post('/api/feed')
                .auth(authToken.token, { type: 'bearer' })
                .send({
                    isBlogPost: 'true',
                    content: 'This is a test post',
                });

            expect(response.status).toBe(201);
            expect(FeedService.prototype.newPost).toHaveBeenCalled();
        });
    });

    describe('newPost file handling', () => {
        let mockRequest: Partial<MulterRequest>;
        let mockResponse: Partial<Response>;
        let mockNext: jest.Mock;
        let userDoc: IUserDocument;
        let roles: IRoleDocument[];
        beforeEach(async () => {
            userDoc = new UserModel();
            roles = await RoleModel.find({})
            mockRequest = {
                body: {},
                files: { images: [] },
                user: RequestUserService.makeRequestUser(userDoc, roles),
            };
            mockResponse = {
                status: jest.fn().mockImplementation(function (this: Response) {
                    return this;
                }),
                send: jest.fn(),
                json: jest.fn(),
            } as Partial<Response>;
            mockNext = jest.fn();
            jest.spyOn(FeedService.prototype, 'newPost').mockImplementation(async (req, res) => {
                res.status(200).json({ message: 'Post created successfully' });
            });
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should handle file upload correctly', async () => {
            const mockFile: Express.Multer.File = {
                fieldname: 'images',
                originalname: 'test.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 1024,
                destination: '/tmp',
                filename: 'test-1234567890.jpg',
                path: '/tmp/test-1234567890.jpg',
                buffer: Buffer.from('mock image data'),
                stream: {} as any,
            };

            (sizeOf as jest.Mock).mockReturnValue({ width: AppConstants.MaxImageDimensions.width, height: AppConstants.MaxImageDimensions.height });

            mockRequest.files = {
                images: [mockFile],
            };
            mockRequest.body = {
                isBlogPost: 'false',
                content: 'Test post content',
            };

            const mockNewPost = { _id: 'mockPostId', content: 'Test post content' };
            (FeedService.prototype.newPost as jest.Mock).mockResolvedValue(mockNewPost);

            await feedController.newPost(mockRequest as Request, mockResponse as Response, mockNext);

            expect(FeedService.prototype.newPost).toHaveBeenCalledWith(
                expect.objectContaining({
                    files: {
                        images: [expect.objectContaining({ originalname: 'test.jpg' })],
                    },
                    body: {
                        isBlogPost: 'false',
                        content: 'Test post content',
                    },
                }),
                expect.anything()
            );
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockNewPost);
        });

        it('should reject if too many images are uploaded', async () => {
            const mockFile: Express.Multer.File = {
                fieldname: 'images',
                originalname: 'test.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 1024,
                destination: '/tmp',
                filename: 'test-1234567890.jpg',
                path: '/tmp/test-1234567890.jpg',
                buffer: Buffer.from('mock image data'),
                stream: {} as any,
            };

            const mockFiles = Array(AppConstants.MaxPostImages + 1).fill(mockFile);

            mockRequest.files = {
                images: mockFiles,
            };
            mockRequest.body = {
                isBlogPost: 'false',
                content: 'Test post content',
            };

            await feedController.newPost(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.stringContaining(`Maximum ${AppConstants.MaxPostImages} images allowed`),
                })
            );
        });

        it('should reject if image size is too large', async () => {
            const mockFile: Express.Multer.File = {
                fieldname: 'images',
                originalname: 'test.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: AppConstants.MaxImageSize + 1,
                destination: '/tmp',
                filename: 'test-1234567890.jpg',
                path: '/tmp/test-1234567890.jpg',
                buffer: Buffer.from('mock image data'),
                stream: {} as any,
            };

            mockRequest.files = {
                images: [mockFile],
            };
            mockRequest.body = {
                isBlogPost: 'false',
                content: 'Test post content',
            };

            await feedController.newPost(mockRequest as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: expect.stringContaining(`Image size should not exceed ${AppConstants.MaxImageSize} bytes`),
                })
            );
        });
        it('should reject if image width exceeds the maximum allowed dimensions in width', async () => {
            const mockFile: Express.Multer.File = {
                fieldname: 'images',
                originalname: 'test.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 1024,
                destination: '/tmp',
                filename: 'test-1234567890.jpg',
                path: '/tmp/test-1234567890.jpg',
                buffer: Buffer.from('mock image data'),
                stream: {} as any,
            };

            (sizeOf as jest.Mock).mockReturnValue({ width: AppConstants.MaxImageDimensions.width + 1, height: AppConstants.MaxImageDimensions.height });

            const multerReq = {
                ...mockRequest,
                files: { images: [mockFile] },
                body: {
                    isBlogPost: 'false',
                    content: 'Test post content',
                },
            } as MulterRequest;

            await feedController.newPost(multerReq as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: `Image dimensions should not exceed ${AppConstants.MaxImageDimensions.width}x${AppConstants.MaxImageDimensions.height}`,
                error: null,
            });
        });

        it('should reject if image height exceeds the maximum allowed dimensions in height', async () => {
            const mockFile: Express.Multer.File = {
                fieldname: 'images',
                originalname: 'test.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 1024,
                destination: '/tmp',
                filename: 'test-1234567890.jpg',
                path: '/tmp/test-1234567890.jpg',
                buffer: Buffer.from('mock image data'),
                stream: {} as any,
            };

            (sizeOf as jest.Mock).mockReturnValue({ width: AppConstants.MaxImageDimensions.width, height: AppConstants.MaxImageDimensions.height + 1 });

            const multerReq = {
                ...mockRequest,
                files: { images: [mockFile] },
                body: {
                    isBlogPost: 'false',
                    content: 'Test post content',
                },
            } as MulterRequest;

            await feedController.newPost(multerReq as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: `Image dimensions should not exceed ${AppConstants.MaxImageDimensions.width}x${AppConstants.MaxImageDimensions.height}`,
                error: null,
            });
        });
    });
    describe('newPost full processing', () => {
        let mockRequest: Partial<MulterRequest>;
        let mockResponse: Partial<Response>;
        let mockNext: jest.Mock;
        let userDoc: IUserDocument;
        let roles: IRoleDocument[];
        beforeEach(async () => {
            userDoc = new UserModel();
            roles = await RoleModel.find({})
            mockRequest = {
                body: {},
                files: { images: [] },
                user: RequestUserService.makeRequestUser(userDoc, roles),
            };
            mockResponse = {
                status: jest.fn().mockImplementation(function (this: Response) {
                    return this;
                }),
                send: jest.fn(),
                json: jest.fn(),
            } as Partial<Response>;
            mockNext = jest.fn();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
        it('should insert a new post and viewpoint into the database', async () => {
            const mockFile: Express.Multer.File = {
                fieldname: 'images',
                originalname: 'test.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 1024,
                destination: '/tmp',
                filename: 'test-1234567890.jpg',
                path: '/tmp/test-1234567890.jpg',
                buffer: Buffer.from('mock image data'),
                stream: {} as Readable,
            };

            (sizeOf as jest.Mock).mockReturnValue({ width: AppConstants.MaxImageDimensions.width, height: AppConstants.MaxImageDimensions.height });

            const multerReq = {
                ...mockRequest,
                files: { images: [mockFile] },
                body: {
                    isBlogPost: 'false',
                    content: 'Test post content',
                },
            } as MulterRequest;

            await feedController.newPost(multerReq as Request, mockResponse as Response, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            const expectedPost = (PostModel.create as jest.Mock).mock.calls[0][0];
            expect(PostModel.create).toHaveBeenCalledWith(expect.objectContaining({
                _id: expectedPost._id,
                depth: expectedPost.depth,
                lastReplyAt: expectedPost.lastReplyAt,
                lastReplyBy: expectedPost.lastReplyBy,
                pId: expectedPost.pId,
                pIds: expectedPost.pIds,
                vpId: expectedPost.vpId,
                vpPIds: expectedPost.vpPIds,
                inVpId: expectedPost.inVpId,
                inVpTransIds: expectedPost.inVpTransIds,
                aiVpId: expectedPost.aiVpId,
                aiVpTransIds: expectedPost.aiVpTransIds,
                reqTransLangs: expectedPost.reqTransLangs,
                aiReqTransLangs: expectedPost.aiReqTransLangs,
                imageUrls: expectedPost.imageUrls,
                hidden: expectedPost.hidden,
                deletedAt: expectedPost.deletedAt,
                createdAt: expectedPost.createdAt,
                createdBy: expectedPost.createdBy,
                deletedBy: expectedPost.deletedBy,
                updatedAt: expectedPost.updatedAt,
                updatedBy: expectedPost.updatedBy,
                metadata: {
                    replies: expectedPost.metadata.replies,
                    expands: expectedPost.metadata.expands,
                    impressions: expectedPost.metadata.impressions,
                    reactions: expectedPost.metadata.reactions,
                    reactionsByType: expectedPost.metadata.reactionsByType,
                    votes: expectedPost.metadata.votes,
                },
                procLock: {
                    id: expectedPost.procLock.id,
                    date: expectedPost.procLock.date,
                },
            }));
            const expectedViewpoint = (PostViewpointModel.create as jest.Mock).mock.calls[0][0];
            expect(PostViewpointModel.create).toHaveBeenCalledWith(expect.objectContaining({
                _id: expectedPost.inVpId,
                postId: expectedPost._id,
                content: 'Test post content',
                humanity: HumanityTypeEnum.Human,
                rendered: 'Test post content',
                metadata: expectedViewpoint.metadata,
            }));
            // Verify that the Upload class was called with the correct parameters
            expect(Upload).toHaveBeenCalledWith(expect.objectContaining({
                client: expect.any(Object),
                params: expect.objectContaining({
                    Bucket: expect.any(String),
                    Key: expect.stringContaining('posts/'),
                    Body: expect.any(Buffer),
                    ContentType: 'image/jpeg',
                }),
            }));
        });
    });
});