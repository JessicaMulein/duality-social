import { IHasTimestamps } from "./hasTimestamps"
import { IHasTimestampOwners } from "./hasTimestampOwners"
import { ObjectId } from "mongoose";

export interface IUsernameChange extends IHasTimestamps, IHasTimestampOwners {
    userId: ObjectId;
    oldName: string;
    newName: string;
}