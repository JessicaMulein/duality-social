import { ObjectId } from "mongoose";
import { IHasTimestamps } from "./hasTimestamps";
import { IHasCreator } from "./hasCreator";

export interface IPostExpand extends IHasTimestamps, IHasCreator {
    postId: ObjectId;
    postImpression: ObjectId;
    botExclude: boolean;
}