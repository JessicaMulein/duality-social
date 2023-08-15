import { IPost } from "./post";
import { IPostViewpoint } from "./postViewpoint";
import { ReactionTypeEnum } from "../enumerations/reactionType";
import { IHasID } from "./hasId";
import { IHasTimestampOwners } from "./hasTimestampOwners";
import { IHasSoftDelete } from "./hasSoftDelete";

export interface IViewpointReaction extends IHasID, IHasTimestampOwners, IHasSoftDelete {
    postId: IPost['_id'];
    viewpointId: IPostViewpoint['_id'];
    reaction: string; // heart, etc
    reactionType: ReactionTypeEnum;
    hidden: boolean;
}