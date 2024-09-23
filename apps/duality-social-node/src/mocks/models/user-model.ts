// src/mocks/models/userModel.ts

import { IUser, IUserDocument } from '@duality-social/duality-social-lib';
import { makeUser } from '../../fixtures/user';
import { createMockDocument } from '../create-mock-document';
import { Types } from 'mongoose';

/**
 * Define the Mocked UserModel interface with constructor signature.
 */
interface MockedUserModel extends jest.MockedClass<any> {
  create: jest.Mock<Promise<IUserDocument>, [Partial<IUser>]>;
  findById: jest.Mock<Promise<IUserDocument | null>, [string]>;
  find: jest.Mock<Promise<IUserDocument[]>, [any]>;
  new (userData: Partial<IUser>): IUserDocument;
}

/**
 * Create a constructor function for UserModel to support `new UserModel()`.
 */
export const UserModel: MockedUserModel = jest.fn(
  (userData: Partial<IUser>) => {
    const user = makeUser(userData);
    return createMockDocument<IUserDocument>(() => user);
  },
) as any;

// Assign static methods to the UserModel function
UserModel.create = jest.fn<Promise<IUserDocument>, [Partial<IUser>]>(
  async (userData: Partial<IUser>) => {
    const user = makeUser(userData);
    return createMockDocument<IUserDocument>(() => user);
  },
);

UserModel.findById = jest.fn<Promise<IUserDocument | null>, [string]>(
  async (id: string) => {
    const user = makeUser({ _id: new Types.ObjectId(id) });
    return createMockDocument<IUserDocument>(() => user);
  },
);

UserModel.find = jest.fn<Promise<IUserDocument[]>, [any]>(
  async (query: any) => {
    const users = [makeUser(), makeUser()];
    return users.map((user) => createMockDocument<IUserDocument>(() => user));
  },
);
