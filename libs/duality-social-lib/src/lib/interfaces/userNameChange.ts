import { IHasID } from "./hasId"
import { IHasTimestamps } from "./hasTimestamps"
import { IHasTimestampOwners } from "./hasTimestampOwners"
import { Schema } from "mongoose";

export interface IUsernameChange extends IHasID, IHasTimestamps, IHasTimestampOwners {
    userId: Schema.Types.ObjectId;
    oldName: string;
    newName: string;
}