import { IHasTimestamps } from "./hasTimestamps";
import { IHasCreator } from "./hasCreator";
import { ObjectId } from "mongoose";

export interface IPostImpression extends IHasTimestamps, IHasCreator {
    postId: ObjectId;
    ip: string;
    botExclude: boolean;
}