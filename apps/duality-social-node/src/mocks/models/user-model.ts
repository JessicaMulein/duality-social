// src/mocks/models/userModel.ts

import { IUser, IUserDocument } from '@duality-social/duality-social-lib';
import { Types } from 'mongoose';
import { makeUser } from '../../fixtures/user';
import { createMockDocument } from '../create-mock-document';

/**
 * Define a constructable type for UserModel.
 */
type UserModelConstructor = new (userData: Partial<IUser>) => IUserDocument;

/**
 * Define the Mocked UserModel interface by extending jest.MockedClass with the constructor type.
 * Removed the explicit 'new' signature as jest.MockedClass already includes it.
 */
interface MockedUserModel extends jest.MockedClass<UserModelConstructor> {
  create: jest.Mock<Promise<IUserDocument>, [Partial<IUser>]>;
  findById: jest.Mock<Promise<IUserDocument | null>, [string]>;
  find: jest.Mock<Promise<IUserDocument[]>, [unknown]>;
  // Add other static methods if applicable
}

/**
 * Create a constructor function for UserModel to support `new UserModel()`.
 * Use Object.assign to merge the constructor mock with static method mocks.
 */
export const UserModel: MockedUserModel = Object.assign(
  // Constructor mock
  jest.fn((userData: Partial<IUser>) => {
    const user = makeUser(userData);
    return createMockDocument<IUserDocument>(() => user);
  }),
  // Static method mocks
  {
    create: jest.fn<Promise<IUserDocument>, [Partial<IUser>]>(
      async (userData: Partial<IUser>) => {
        const user = makeUser(userData);
        return createMockDocument<IUserDocument>(() => user);
      },
    ),

    findById: jest.fn<Promise<IUserDocument | null>, [string]>(
      async (id: string) => {
        if (!id) return null;
        const user = makeUser({ _id: new Types.ObjectId(id) });
        return createMockDocument<IUserDocument>(() => user);
      },
    ),

    find: jest.fn<Promise<IUserDocument[]>, [unknown]>(
      async (query: unknown) => {
        const users = [makeUser(), makeUser()];
        return users.map((user) =>
          createMockDocument<IUserDocument>(() => user),
        );
      },
    ),

    // If there are more static methods, add them here
  },
) as MockedUserModel;
