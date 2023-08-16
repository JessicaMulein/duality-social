import { DefaultReactionsTypeEnum } from '../enumerations/defaultReactionsType';
import { IHasCreator } from './hasCreator';
import { IHasID } from './hasId';
import { IHasTimestamps } from './hasTimestamps';
import { IPost } from './post';
import { IPostViewpoint } from './postViewpoint';

export interface IPostViewpointReaction extends IHasID, IHasTimestamps, IHasCreator {
    /**
     * The post that the reaction is on.
     */
    postId: IPost['_id'];
    /**
     * The viewpoint that the reaction is on.
     */
    viewpointId: IPostViewpoint['_id'];
    /**
     * The built-in reaction that was made.
     */
    reaction?: DefaultReactionsTypeEnum;
}