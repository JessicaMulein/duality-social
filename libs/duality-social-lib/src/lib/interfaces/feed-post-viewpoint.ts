import { Types } from "mongoose";
import { DefaultReactionsTypeEnum } from "../enumerations/default-reactions-type.ts";
import { HumanityTypeEnum } from "../enumerations/humanity-type.ts";
import { ViewpointTypeEnum } from "../enumerations/viewpoint-type.ts";
import { IFeedPost } from "./feed-post.ts";
import { IHasCreation } from "./has-creation.ts";
import { IHasCreator } from "./has-creator.ts";

export interface IFeedPostViewpoint extends IHasCreation, IHasCreator {
    id: Types.ObjectId;
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
    createdBy: Types.ObjectId;
    replies: IFeedPost[];
  }