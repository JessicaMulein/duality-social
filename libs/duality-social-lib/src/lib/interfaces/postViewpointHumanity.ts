import { ObjectId } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { IHasCreator } from './hasCreator';
import { IHasTimestamps } from './hasTimestamps';

export interface IPostViewpointHumanity extends IHasTimestamps, IHasCreator {
    viewpointId: ObjectId;
    humanity: HumanityTypeEnum;
}