import { Schema } from "mongoose";
import { IHasID } from "./hasId";
import { IHasTimestamps } from "./hasTimestamps";
import { IHasCreator } from "./hasCreator";

export interface IPostImpression extends IHasID, IHasTimestamps, IHasCreator {
    postId: Schema.Types.ObjectId;
    ip: string;
    botExclude: boolean;
}