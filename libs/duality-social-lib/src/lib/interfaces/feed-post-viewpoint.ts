import { ObjectId } from "mongoose";
import { DefaultReactionsTypeEnum } from "../enumerations/default-reactions-type";
import { HumanityTypeEnum } from "../enumerations/humanity-type";
import { ViewpointTypeEnum } from "../enumerations/viewpoint-type";
import { IFeedPost } from "./feed-post";
import { IHasCreation } from "./has-creation";
import { IHasCreator } from "./has-creator";

export interface IFeedPostViewpoint extends IHasCreation, IHasCreator {
    id: ObjectId;
    content: string;
    rendered: string;
    translated: boolean;
    lang: string;
    metadata: {
      replies: number;
      expands: number;
      impressions: number;
      reactions: number;
      reactionsByType: { [key in DefaultReactionsTypeEnum]: number };
      humanityByType: { [key in HumanityTypeEnum]: number };
      votes: number;
    };
    type: ViewpointTypeEnum;
    createdAt: Date;
    createdBy: ObjectId;
    replies: IFeedPost[];
  }