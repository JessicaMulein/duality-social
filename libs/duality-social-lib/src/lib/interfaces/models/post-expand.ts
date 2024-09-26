import { Types } from 'mongoose';
import { IHasCreator } from '../has-creator.ts';
import { IHasTimestamps } from '../has-timestamps.ts';

export interface IPostExpand extends IHasTimestamps, IHasCreator {
  postId: Types.ObjectId;
  postImpression: Types.ObjectId;
  viewpointId?: Types.ObjectId;
  botExclude: boolean;
}
