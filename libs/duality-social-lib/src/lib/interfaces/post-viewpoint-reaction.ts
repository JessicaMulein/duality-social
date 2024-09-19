import { Types } from 'mongoose';
import { DefaultReactionsTypeEnum } from '../enumerations/default-reactions-type.ts';
import { IHasCreator } from './has-creator.ts';
import { IHasTimestamps } from './has-timestamps.ts';

export interface IPostViewpointReaction extends IHasTimestamps, IHasCreator {
    /**
     * The post that the reaction is on.
     */
    postId: Types.ObjectId;
    /**
     * The viewpoint that the reaction is on.
     */
    viewpointId: Types.ObjectId;
    /**
     * The built-in reaction that was made.
     */
    reaction: DefaultReactionsTypeEnum;
}