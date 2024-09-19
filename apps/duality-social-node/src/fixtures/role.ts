import { IRoleDocument } from "@duality-social/duality-social-lib";
import { ObjectId, Types } from "mongoose";

export function makeRole(users: ObjectId[], admin: boolean): Partial<IRoleDocument> {
    return {
        _id: new Types.ObjectId() as any,
        name: admin ? 'admin' : 'member',
        users: users,
        globalAdmin: admin,
        member: !admin
    } as Partial<IRoleDocument>;
}