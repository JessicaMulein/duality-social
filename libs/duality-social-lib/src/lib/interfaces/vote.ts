import { HumanityTypeEnum } from '../enumerations/humanityType';
import { IHasCreator } from './hasCreator';
import { IHasID } from './hasId';
import { IHasTimestamps } from './hasTimestamps';
import { IPost } from './post';

export interface IVote extends IHasID, IHasTimestamps, IHasCreator {
    postId: IPost['_id'];
    humanity: HumanityTypeEnum;
}