import { Transformer } from "./base";
import { IUser } from "../../../duality-social-lib/src/lib/interfaces/user";
import { IUserResponse } from "../../../duality-social-lib/src/lib/interfaces/user-response";

export class UserResponseTransformer extends Transformer<IUser, IUserResponse> {
    override transform(model: IUser): IUserResponse {
        return {
            email: model.email,
            lockStatus: model.lockStatus,
            username: model.username,
            tz: model.tz,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
        }
    }
    static transform(model: IUser): IUserResponse {
        return new UserResponseTransformer().transform(model);
    }
}