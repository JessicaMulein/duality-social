import { ObjectId } from 'mongoose';
import { DefaultReactionsTypeEnum } from '../enumerations/defaultReactionsType';
import { IHasCreator } from './hasCreator';
import { IHasTimestamps } from './hasTimestamps';

export interface IPostViewpointReaction extends IHasTimestamps, IHasCreator {
    /**
     * The post that the reaction is on.
     */
    postId: ObjectId;
    /**
     * The viewpoint that the reaction is on.
     */
    viewpointId: ObjectId;
    /**
     * The built-in reaction that was made.
     */
    reaction: DefaultReactionsTypeEnum;
}