import { IPost, IPostDocument, IPostViewpoint, IPostViewpointDocument, IRole, IRoleDocument, IUser, IUserDocument, RoleModel, UserModel } from '@duality-social/duality-social-lib';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import { UserService } from '../../services/user';
import { ObjectId } from 'bson';

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
    const userService: UserService = new UserService();
    const userDoc: IUserDocument = getUserDoc(makeUser());
    const roles: IRoleDocument[] = [
        makeRole({ users: [userDoc._id], admin: true, member: false }),
        makeRole({ users: [userDoc._id], admin: false, member: true })
    ]; 
    return ({
        authenticateToken: (req: Request, res: Response, next: NextFunction) => {
            const token = req.get('Authorization')?.split(' ')[1] || req.header('Authorization')?.split(' ')[1];
            if (token) {
                req.user = userService.makeRequestUser(userDoc, roles);
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