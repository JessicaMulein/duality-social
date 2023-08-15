import { HumanityTypeEnum } from '../enumerations/humanityType';
import { IHasCreation } from './hasCreation';
import { IHasCreator } from './hasCreator';
import { IHasID } from './hasId';
import { IHasTimestamps } from './hasTimestamps';
import { IPost } from './post';
import { IUser } from './user';

export interface IVote extends IHasID, IHasTimestamps, IHasCreator {
    postId: IPost['_id'];
    humanity: HumanityTypeEnum;
}