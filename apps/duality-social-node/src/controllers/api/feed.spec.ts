/* eslint-disable @typescript-eslint/no-var-requires */

// 1. Place all jest.mock calls at the very top to prevent circular dependencies

// Mock 'image-size' module
jest.mock('image-size');

// Mock '@aws-sdk/lib-storage' module
jest.mock('@aws-sdk/lib-storage', () => ({
  Upload: jest.fn().mockImplementation(() => ({
    done: jest.fn().mockResolvedValue({
      Location: 'https://mock-s3-url.com/mock-image.jpg',
    }),
  })),
}));

jest.mock('@duality-social/duality-social-node-lib', () => {
  const originalModule = jest.requireActual(
    '@duality-social/duality-social-node-lib',
  );

  // Directly import the mock models instead of requiring the mock file itself
  const PostModel = require('../../mocks/models/post-model').PostModel;
  const PostViewpointModel =
    require('../../mocks/models/post-viewpoint-model').PostViewpointModel;
  const RoleModel = require('../../mocks/models/role-model').RoleModel;
  const UserModel = require('../../mocks/models/user-model').UserModel;

  return {
    ...originalModule,
    UserModel,
    RoleModel,
    PostModel,
    PostViewpointModel,
  };
});

// Mock '@duality-social/duality-social-lib' to override AppConstants
jest.mock('@duality-social/duality-social-lib', () => {
  const originalModule = jest.requireActual(
    '@duality-social/duality-social-lib',
  );
  const AppConstants = {
    EmailTokenExpiration: 24 * 60 * 60 * 1000,
    EmailTokenLength: 32,
    BcryptRounds: 10,
    JwtAlgo: 'HS256',
    JwtExpiration: 86400,
    UsernameRegex: /^[A-Za-z0-9]{3,30}$/,
    UsernameRegexError:
      'Username must be 3-30 characters long and contain only letters and numbers',
    PasswordRegex:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/,
    PasswordRegexError:
      'Password must be at least 8 characters long and include at least one letter, one number, and one special character (!@#$%^&*()_+-=[]{};\':"|,.<>/?)',
    EmailTokenResendInterval: 5 * 60 * 1000, // 5 minutes
    ApplicationName: 'Duality Social',
    EmailSender: 'noreply@duality.social',
    EmailFrom: 'Duality Social <noreply@duality.social>',
    MaxPostLength: 280,
    MaxBlogPostLength: 1000,
    MaxPostImages: 4,
    MaxImageSize: 5 * 1024 * 1024, // 5 MB
    MaxImageDimensions: { width: 1920, height: 1080 },
  };
  return {
    ...originalModule,
    AppConstants,
  };
});

const userDoc: IUserDocument = require('../../fixtures/user').makeUser();

// Mock '../../middlewares/authenticate-token' to simulate authenticated user
jest.mock('../../middlewares/authenticate-token', () => {
  const { makeRole } = require('../../fixtures/role');
  const { RequestUserService } = require('../../services/request-user.ts');
  const roles = [
    makeRole({ users: [userDoc._id], globalAdmin: true, member: false }),
    makeRole({ users: [userDoc._id], globalAdmin: false, member: true }),
  ];
  return {
    authenticateToken: (req: Request, res: Response, next: NextFunction) => {
      const authHeader =
        req.get('Authorization') || req.header('Authorization');
      const token = authHeader?.split(' ')[1];
      if (token) {
        req.user = RequestUserService.makeRequestUser(userDoc, roles);
        next();
      } else {
        res.status(401).send({ message: 'Unauthorized' });
      }
    },
  };
});

// Mock 'franc' module to always return 'en' for language detection
jest.mock('franc', () => ({
  franc: jest.fn(() => 'en'),
}));

// 2. Now proceed with the import statements
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import sizeOf from 'image-size';
import { Upload } from '@aws-sdk/lib-storage';
import { Types } from 'mongoose';
import { Readable } from 'stream';
import feedRouter, { FeedControllerInstance } from './feed.ts';
import { ISignedToken } from '../../interfaces/signed-token.ts';
import { getAuthToken } from '../../fixtures/auth.ts';
import { makeRole } from '../../fixtures/role';
import { makePost } from '../../fixtures/post';
import { makePostViewpoint } from '../../fixtures/post-viewpoint';
import { MulterRequest } from '../../interfaces/multer-request.ts';
import { FeedService } from '../../services/feed.ts';
import { RequestUserService } from '../../services/request-user.ts';
import {
  AppConstants,
  HumanityTypeEnum,
  IPostDocument,
  IPostObject,
  IPostViewpointDocument,
  IPostViewpointObject,
  IRoleDocument,
  IUserDocument,
  ParentPostIdMismatchError,
  ParentPostNotFoundError,
  ParentViewpointNotFoundError,
  ViewpointTypeEnum,
} from '@duality-social/duality-social-lib';
import { RoleModel } from '../../mocks/models/role-model';
import { PostModel } from '../../mocks/models/post-model';
import { PostViewpointModel } from '../../mocks/models/post-viewpoint-model';
import { createMockDocument } from '../../mocks/create-mock-document.ts';

// 3. Initialize Express app for testing
const app = express();
app.use(bodyParser.json());
app.use('/api/feed', feedRouter);

// 4. Begin test suite
describe('FeedController - newPost', () => {
  let originalConsoleError: typeof console.error;
  let authToken: ISignedToken;

  let roles: IRoleDocument[];
  let post: IPostDocument;
  let viewpoint: IPostViewpointDocument;

  beforeAll(async () => {
    originalConsoleError = console.error;
    // Generate an authentication token for a mock user
    authToken = await getAuthToken(userDoc);
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  beforeEach(async () => {
    // Mock RoleModel.find to return roles that include the current user's ID
    jest.spyOn(RoleModel, 'find').mockResolvedValue([
      makeRole({ users: [userDoc._id], globalAdmin: true, member: false }),
      makeRole({
        users: [userDoc._id],
        globalAdmin: false,
        member: true,
      }),
    ]);

    // Fetch mocked roles
    roles = await RoleModel.find({});

    post = createMockDocument<IPostDocument>(() =>
      makePost({
        createdBy: userDoc._id,
        updatedBy: userDoc._id,
        deletedBy: userDoc._id,
      }),
    );
    viewpoint = createMockDocument<IPostViewpointDocument>(() =>
      makePostViewpoint({
        createdBy: userDoc._id,
        updatedBy: userDoc._id,
        deletedBy: undefined,
        postId: post._id,
      }),
    );
  });

  describe('new post validation', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return 401 if no token is provided', async () => {
      const response = await request(app).post('/api/feed').send({
        isBlogPost: 'true',
        content: viewpoint.content,
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });

    it('should return 400 if isBlogPost is missing', async () => {
      const response = await request(app)
        .post('/api/feed')
        .auth(authToken.token, { type: 'bearer' })
        .send({
          content: viewpoint.content,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: 'isBlogPost is required',
          }),
        ]),
      );
    });

    it('should return 400 if isBlogPost is not "true" or "false"', async () => {
      const response = await request(app)
        .post('/api/feed')
        .auth(authToken.token, { type: 'bearer' })
        .send({
          isBlogPost: 'maybe',
          content: viewpoint.content,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: 'isBlogPost must be either "true" or "false"',
          }),
        ]),
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
        ]),
      );
    });

    it('should return 201 if all required fields are present and valid', async () => {
      const mockNewPost = jest.fn().mockResolvedValue({
        post,
        viewpoint,
      });
      jest
        .spyOn(FeedService.prototype, 'newPost')
        .mockImplementation(mockNewPost);

      const response = await request(app)
        .post('/api/feed')
        .auth(authToken.token, { type: 'bearer' })
        .send({
          isBlogPost: 'true',
          content: viewpoint.content,
        });

      expect(response.status).toBe(201);
      expect(FeedService.prototype.newPost).toHaveBeenCalled();
      expect(response.body).toEqual({
        message: 'New post created successfully',
        post: post.toObject() as IPostObject,
        viewpoint: viewpoint.toObject() as IPostViewpointObject,
      });
    });
  });

  describe('newPost file handling', () => {
    let mockRequest: Partial<MulterRequest>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(async () => {
      // Prepare mock request
      mockRequest = {
        body: {},
        files: { images: [] },
        user: RequestUserService.makeRequestUser(userDoc, roles),
      };

      // Prepare mock response
      mockResponse = {
        status: jest.fn().mockImplementation(function (this: Response) {
          return this;
        }),
        send: jest.fn(),
        json: jest.fn(),
      } as Partial<Response>;

      // Prepare mock next function
      mockNext = jest.fn();

      // Mock FeedService.prototype.newPost to return the mock post
      jest.spyOn(FeedService.prototype, 'newPost').mockImplementation(
        async (
          req: Request,
        ): Promise<{
          post: IPostDocument;
          viewpoint: IPostViewpointDocument;
        }> => {
          return {
            post,
            viewpoint,
          };
        },
      );
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
        stream: {} as Readable,
      };

      // Mock sizeOf to return valid dimensions
      (sizeOf as jest.Mock).mockReturnValue({
        width: AppConstants.MaxImageDimensions.width,
        height: AppConstants.MaxImageDimensions.height,
      });

      mockRequest.files = {
        images: [mockFile],
      };
      mockRequest.body = {
        isBlogPost: 'false',
        content: viewpoint.content,
      };

      await FeedControllerInstance.newPost(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(FeedService.prototype.newPost).toHaveBeenCalledWith(
        expect.objectContaining({
          body: {
            content: viewpoint.content,
            isBlogPost: 'false',
          },
          files: {
            images: [expect.objectContaining({ originalname: 'test.jpg' })],
          },
          user: expect.objectContaining({
            email: userDoc.email,
            emailVerified: userDoc.emailVerified,
            humanityType: userDoc.humanityType,
            id: userDoc._id.toString(),
            languages: userDoc.languages,
            lastLogin: userDoc.lastLogin,
            roles: expect.arrayContaining(
              roles.map((role) =>
                expect.objectContaining({
                  _id: role._id,
                  globalAdmin: role.globalAdmin,
                  member: role.member,
                  name: role.name,
                  users: expect.arrayContaining([userDoc._id]),
                }),
              ),
            ),
            timezone: userDoc.timezone,
            username: userDoc.username,
          }),
        }),
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'New post created successfully',
        post: post.toObject() as IPostObject,
        viewpoint: viewpoint.toObject() as IPostViewpointObject,
      });
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
        stream: {} as Readable,
      };

      const mockFiles = Array(AppConstants.MaxPostImages + 1).fill(mockFile);

      mockRequest.files = {
        images: mockFiles,
      };
      mockRequest.body = {
        isBlogPost: 'false',
        content: viewpoint.content,
      };

      await FeedControllerInstance.newPost(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining(
            `Maximum ${AppConstants.MaxPostImages} images allowed`,
          ),
        }),
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
        stream: {} as Readable,
      };

      mockRequest.files = {
        images: [mockFile],
      };
      mockRequest.body = {
        isBlogPost: 'false',
        content: viewpoint.content,
      };

      await FeedControllerInstance.newPost(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining(
            `Image size should not exceed ${AppConstants.MaxImageSize} bytes`,
          ),
        }),
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
        stream: {} as Readable,
      };

      // Mock sizeOf to return width exceeding the limit
      (sizeOf as jest.Mock).mockReturnValue({
        width: AppConstants.MaxImageDimensions.width + 1,
        height: AppConstants.MaxImageDimensions.height,
      });

      const multerReq = {
        ...mockRequest,
        files: { images: [mockFile] },
        body: {
          isBlogPost: 'false',
          content: viewpoint.content,
        },
      } as MulterRequest;

      await FeedControllerInstance.newPost(
        multerReq as Request,
        mockResponse as Response,
        mockNext,
      );

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
        stream: {} as Readable,
      };

      // Mock sizeOf to return height exceeding the limit
      (sizeOf as jest.Mock).mockReturnValue({
        width: AppConstants.MaxImageDimensions.width,
        height: AppConstants.MaxImageDimensions.height + 1,
      });

      const multerReq = {
        ...mockRequest,
        files: { images: [mockFile] },
        body: {
          isBlogPost: 'false',
          content: viewpoint.content,
        },
      } as MulterRequest;

      await FeedControllerInstance.newPost(
        multerReq as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: `Image dimensions should not exceed ${AppConstants.MaxImageDimensions.width}x${AppConstants.MaxImageDimensions.height}`,
        error: null,
      });
    });
  });

  describe('FeedController - newPost with parentPostId and parentViewpointId', () => {
    let mockRequest: Partial<MulterRequest>;
    let mockResponse: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(async () => {
      mockRequest = {
        body: {
          isBlogPost: 'false',
          content: viewpoint.content,
          parentPostId: post._id.toString(),
          parentViewpointId: viewpoint._id.toString(),
        },
        user: RequestUserService.makeRequestUser(userDoc, roles),
      };

      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      mockNext = jest.fn();

      jest
        .spyOn(PostModel, 'findById')
        .mockImplementation((id: string | Types.ObjectId) => {
          if (
            (typeof id === 'string' && id === post._id.toString()) ||
            (typeof id !== 'string' && id.equals(post._id))
          ) {
            return {
              exec: jest.fn().mockResolvedValue(post),
            };
          }
          return {
            exec: jest.fn().mockResolvedValue(null),
          };
        });

      jest
        .spyOn(PostViewpointModel, 'findById')
        .mockImplementation((id: string | Types.ObjectId) => {
          if (
            (typeof id === 'string' && id === viewpoint._id.toString()) ||
            (typeof id !== 'string' && id.equals(viewpoint._id))
          ) {
            return {
              exec: jest.fn().mockResolvedValue(viewpoint),
            };
          }
          return {
            exec: jest.fn().mockResolvedValue(null),
          };
        });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should handle correct parentPostId and parentViewpointId', async () => {
      await FeedControllerInstance.newPost(
        mockRequest as MulterRequest,
        mockResponse as Response,
        mockNext,
      );

      expect(PostModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expect.any(Types.ObjectId),
          createdAt: expect.any(Date),
          createdBy: userDoc._id,
          depth: expect.any(Number),
          imageUrls: expect.any(Array),
          inVpId: expect.any(Types.ObjectId),
          metadata: expect.objectContaining({
            expands: 0,
            impressions: 0,
            reactions: 0,
            reactionsByType: expect.any(Object),
            replies: 0,
            votes: 0,
          }),
          pId: post._id,
          pIds: expect.any(Array),
          reqTransLangs: expect.any(Array),
          updatedAt: expect.any(Date),
          updatedBy: userDoc._id,
          vpId: viewpoint._id,
          vpPIds: expect.any(Array),
          inVpTransIds: expect.any(Array),
          aiVpTransIds: expect.any(Array),
          aiReqTransLangs: expect.any(Array),
        }),
      );
      const createdPost = await PostModel.create.mock.results[0].value;
      expect(PostViewpointModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expect.any(Types.ObjectId),
          postId: createdPost._id,
          content: mockRequest.body.content,
          rendered: expect.any(String),
          translated: false,
          type: ViewpointTypeEnum.HumanSource,
          createdAt: expect.any(Date),
          createdBy: userDoc._id,
          humanity: HumanityTypeEnum.Human,
          lang: expect.any(String),
          metadata: expect.objectContaining({
            expands: 0,
            impressions: 0,
            reactions: 0,
            reactionsByType: expect.any(Object),
            humanityByType: expect.any(Object),
            replies: 0,
            votes: 0,
          }),
          updatedAt: expect.any(Date),
          updatedBy: userDoc._id,
        }),
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should handle mismatched parentPostId and parentViewpointId', async () => {
      console.error = jest.fn();

      jest
        .spyOn(PostViewpointModel, 'findById')
        .mockImplementation((id: string | Types.ObjectId) => {
          if (
            (typeof id === 'string' && id === viewpoint._id.toString()) ||
            (typeof id !== 'string' && id.equals(viewpoint._id))
          ) {
            return {
              exec: jest
                .fn()
                .mockResolvedValue(
                  createMockDocument<IPostViewpointDocument>(() =>
                    makePostViewpoint(),
                  ),
                ),
            };
          }
          return {
            exec: jest.fn().mockResolvedValue(null),
          };
        });

      await FeedControllerInstance.newPost(
        mockRequest as MulterRequest,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(ParentPostIdMismatchError),
      );
    });

    it('should handle non-existing parentPostId', async () => {
      console.error = jest.fn();

      jest.spyOn(PostModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as unknown as ReturnType<typeof PostModel.findById>);

      await FeedControllerInstance.newPost(
        mockRequest as MulterRequest,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(ParentPostNotFoundError),
      );
    });

    it('should handle non-existing parentViewpointId', async () => {
      jest.spyOn(PostViewpointModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as { exec: jest.Mock<unknown, any, any> });

      await FeedControllerInstance.newPost(
        mockRequest as MulterRequest,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalledWith(
        expect.any(ParentViewpointNotFoundError),
      );
    });
  });

  describe('FeedController - newPost full processing', () => {
    let feedService: FeedService;
    let mockRequest: Partial<MulterRequest>;

    beforeEach(async () => {
      feedService = new FeedService();
      mockRequest = {
        body: {
          isBlogPost: 'false',
          content: viewpoint.content,
        },
        user: RequestUserService.makeRequestUser(userDoc, roles),
      };
      jest.clearAllMocks();
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

      const mockMulterRequest = {
        ...mockRequest,
        files: {
          images: [mockFile],
        },
      } as MulterRequest;

      // Mock sizeOf to return valid dimensions
      (sizeOf as jest.Mock).mockReturnValue({
        width: AppConstants.MaxImageDimensions.width,
        height: AppConstants.MaxImageDimensions.height,
      });

      const result = await feedService.newPost(mockMulterRequest);

      // Verify that the Upload class was called with the correct parameters
      expect(Upload).toHaveBeenCalledWith(
        expect.objectContaining({
          client: expect.any(Object),
          params: expect.objectContaining({
            Bucket: expect.any(String),
            Key: expect.stringContaining('posts/'),
            Body: expect.any(Buffer),
            ContentType: 'image/jpeg',
          }),
        }),
      );

      const createdPost = await PostModel.create.mock.results[0].value;
      const createdViewpoint =
        await PostViewpointModel.create.mock.results[0].value;
      expect(result).toEqual({
        post: createdPost,
        viewpoint: createdViewpoint,
      });

      expect(PostModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expect.any(Types.ObjectId),
          createdAt: expect.any(Date),
          createdBy: userDoc._id,
          depth: expect.any(Number),
          imageUrls: expect.any(Array),
          inVpId: expect.any(Types.ObjectId),
          metadata: expect.objectContaining({
            expands: 0,
            impressions: 0,
            reactions: 0,
            reactionsByType: expect.any(Object),
            replies: 0,
            votes: 0,
          }),
          pId: undefined,
          pIds: expect.any(Array),
          reqTransLangs: expect.any(Array),
          updatedAt: expect.any(Date),
          updatedBy: userDoc._id,
          vpId: undefined,
          vpPIds: expect.any(Array),
          inVpTransIds: expect.any(Array),
          aiVpTransIds: expect.any(Array),
          aiReqTransLangs: expect.any(Array),
        }),
      );
      expect(PostViewpointModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          _id: expect.any(Types.ObjectId),
          postId: createdPost._id,
          content: mockRequest.body.content,
          rendered: expect.any(String),
          translated: false,
          type: ViewpointTypeEnum.HumanSource,
          createdAt: expect.any(Date),
          createdBy: userDoc._id,
          humanity: HumanityTypeEnum.Human,
          lang: expect.any(String),
          metadata: expect.objectContaining({
            expands: 0,
            impressions: 0,
            reactions: 0,
            reactionsByType: expect.any(Object),
            humanityByType: expect.any(Object),
            replies: 0,
            votes: 0,
          }),
          updatedAt: expect.any(Date),
          updatedBy: userDoc._id,
        }),
      );
    });
  });
});
