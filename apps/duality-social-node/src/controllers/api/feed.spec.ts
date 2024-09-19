import request from 'supertest';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import sizeOf from 'image-size';
import feedRouter, { FeedController, FeedControllerInstance } from './feed';
import { ISignedToken } from '../../interfaces/signed-token';
import { makeRequestUser } from '../../fixtures/request-user';
import { getAuthToken } from '../../fixtures/auth';
import { getUserDoc, makeUser } from '../../fixtures/user';
import { MulterRequest } from '../../interfaces/multer-request';
import { FeedService } from '../../services/feed';
import { AppConstants } from '@duality-social/duality-social-lib';

jest.mock('image-size');

const app = express();
app.use(bodyParser.json());
app.use('/api/feed', feedRouter);

jest.mock('@duality-social/duality-social-lib/src/lib/models/user', () => ({
    UserModel: jest.fn().mockImplementation(() => ({
        validateSync: jest.fn().mockReturnValue(null),
    })),
}));


jest.mock('@duality-social/duality-social-lib/src/lib/models/role', () => {
    return {
        RoleModel: {
            find: jest.fn().mockImplementation(() => {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { makeRole } = require('../../fixtures/role');
                return Promise.resolve([
                    makeRole([], false),
                    makeRole([], true),
                ]);
            }),
        },
    };
});

jest.mock('../../middlewares/authenticate-token', () => ({
    authenticateToken: (req: Request, res: Response, next: NextFunction) => {
        const token = req.get('Authorization')?.split(' ')[1] || req.header('Authorization')?.split(' ')[1];
        if (token) {
            req.user = makeRequestUser();
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    },
}));

describe('FeedController - newPost Validation', () => {
    let authToken: ISignedToken;
    let feedController: FeedController;
    let mockRequest: Partial<MulterRequest>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeAll(async () => {
        //authToken = { token: 'valid-token', tokenUser: { userId: 'user-id', roles: []}, roleNames: [], roles: [] };
        authToken = await getAuthToken(await getUserDoc(makeUser()));
        feedController = FeedControllerInstance;
    });

    beforeEach(() => {
        mockRequest = {
            body: {},
            files: { images: [] },
            user: makeRequestUser(),
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe('new post validation', () => {
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
        beforeEach(() => {
            jest.spyOn(FeedService.prototype, 'newPost').mockImplementation(async (req, res) => {
                res.status(200).json({ message: 'Post created successfully' });
            });
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
});