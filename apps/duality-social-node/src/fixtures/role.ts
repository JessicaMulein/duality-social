import {
  IRole,
  IRoleDocument,
  IRoleObject,
} from '@duality-social/duality-social-lib';
import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

export function makeRole(overrides: Partial<IRoleObject> = {}): IRoleDocument {
  const isAdmin = faker.datatype.boolean();
  const role: IRole = {
    name: faker.lorem.word(),
    users: [new Types.ObjectId()],
    globalAdmin: isAdmin,
    member: !isAdmin,
    ...overrides,
  };
  return {
    _id: new Types.ObjectId(),
    ...role,
  } as IRoleDocument;
}

export default makeRole;
