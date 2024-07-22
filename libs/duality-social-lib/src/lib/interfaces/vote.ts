import { ObjectId } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { IHasCreator } from './hasCreator';
import { IHasTimestamps } from './hasTimestamps';

export interface IVote extends IHasTimestamps, IHasCreator {
    postId: ObjectId;
    humanity: HumanityTypeEnum;
}