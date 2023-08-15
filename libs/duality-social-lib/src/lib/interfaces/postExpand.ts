import { Schema } from "mongoose";
import { IHasID } from "./hasId";
import { IHasTimestamps } from "./hasTimestamps";
import { IHasCreator } from "./hasCreator";

export interface IPostExpand extends IHasID, IHasTimestamps, IHasCreator {
    postId: Schema.Types.ObjectId;
    postImpression: Schema.Types.ObjectId;
    botExclude: boolean;
}