import { IHasCreator } from "./hasCreator";
import { IHasTimestamps } from "./hasTimestamps";
import { ObjectId } from "mongoose";

export interface ISudoLog extends IHasCreator, IHasTimestamps {
    userId: ObjectId;
    adminUserId: ObjectId;
    success: boolean;
}