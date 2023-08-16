import { IHasID } from "./hasId";
import { IHasTimestamps } from "./hasTimestamps";
import { IUser } from "./user";

export interface IAdminUser extends IHasID, IHasTimestamps {
    userId: IUser['_id'];
    lastSudo?: Date;
    lastFailedSudo?: Date;
    sudoHash: string;
    sudoHashSalt: string;
    get canSudo(): boolean;
  }