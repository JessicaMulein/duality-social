import { Types } from 'mongoose';
import { HumanityTypeEnum } from '../../enumerations/humanity-type.ts';
import { IHasCreator } from '../has-creator.ts';
import { IHasTimestamps } from '../has-timestamps.ts';

export interface IPostViewpointHumanity extends IHasTimestamps, IHasCreator {
  viewpointId: Types.ObjectId;
  humanity: HumanityTypeEnum;
}
