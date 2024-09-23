// src/mocks/models/role-model.ts

import { IRole, IRoleDocument } from '@duality-social/duality-social-lib';
import { makeRole } from '../../fixtures/role';
import { createMockDocument } from '../create-mock-document';
import { Types } from 'mongoose';

/**
 * Define the Mocked RoleModel interface with constructor signature.
 */
interface MockedRoleModel extends jest.MockedClass<any> {
  create: jest.Mock<Promise<IRoleDocument>, [Partial<IRole>]>;
  findById: jest.Mock<Promise<IRoleDocument | null>, [string]>;
  find: jest.Mock<Promise<IRoleDocument[]>, [any]>;
  findByIdAndUpdate: jest.Mock<
    Promise<IRoleDocument | null>,
    [string, Partial<IRole>, any]
  >;
  findByIdAndDelete: jest.Mock<Promise<IRoleDocument | null>, [string]>;
  new (roleData: Partial<IRole>): IRoleDocument;
}

/**
 * Create a constructor function for RoleModel to support `new RoleModel()`.
 */
export const RoleModel: MockedRoleModel = jest.fn(
  (roleData: Partial<IRole>) => {
    const role = makeRole(roleData);
    return createMockDocument<IRoleDocument>(() => role);
  },
) as any;

// Assign static methods to the RoleModel function
RoleModel.create = jest.fn<Promise<IRoleDocument>, [Partial<IRole>]>(
  async (roleData: Partial<IRole>) => {
    const role = makeRole(roleData);
    return createMockDocument<IRoleDocument>(() => role);
  },
);

RoleModel.findById = jest.fn<Promise<IRoleDocument | null>, [string]>(
  async (id: string) => {
    if (!id) return null;
    const role = makeRole({ _id: new Types.ObjectId(id) });
    return createMockDocument<IRoleDocument>(() => role);
  },
);

RoleModel.find = jest.fn<Promise<IRoleDocument[]>, [any]>(
  async (query: any) => {
    const roles = [makeRole(), makeRole()];
    return roles.map((role) => createMockDocument<IRoleDocument>(() => role));
  },
);

RoleModel.findByIdAndUpdate = jest.fn<
  Promise<IRoleDocument | null>,
  [string, Partial<IRole>, any]
>(async (id: string, updateData: Partial<IRole>, options: any) => {
  const existingRole = await RoleModel.findById(id);
  if (!existingRole) return null;

  // Create a new role object with updated data
  const updatedRole = Object.assign(existingRole.toObject(), updateData);

  // Return a mocked document with full Mongoose properties/methods
  return createMockDocument<IRoleDocument>(() => updatedRole as IRoleDocument);
});

RoleModel.findByIdAndDelete = jest.fn<Promise<IRoleDocument | null>, [string]>(
  async (id: string) => {
    const role = await RoleModel.findById(id);
    if (!role) return null;

    // Simulate deletion by returning the role
    return role;
  },
);
