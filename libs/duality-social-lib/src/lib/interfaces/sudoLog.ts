import { IAdminUser } from "./adminUser";
import { IUser } from "./user";
import { IHasID } from "./hasId";
import { IHasCreator } from "./hasCreator";
import { IHasTimestamps } from "./hasTimestamps";

export interface ISudoLog extends IHasID, IHasCreator, IHasTimestamps {
    userId: IUser['_id'];
    adminUserId: IAdminUser['_id'];
    success: boolean;
}