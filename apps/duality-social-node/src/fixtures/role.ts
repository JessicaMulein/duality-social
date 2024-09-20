import { Types } from "mongoose";
import { IRole, IRoleDocument } from "@duality-social/duality-social-lib";
import { faker } from '@faker-js/faker'; '@faker-js/faker';

export function makeRole(overrides = {}): Partial<IRoleDocument> {
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
        ...role
    } as Partial<IRoleDocument>;
}