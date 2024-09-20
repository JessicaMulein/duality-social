import { Types } from 'mongoose';
import { IHasTimestamps } from '../has-timestamps.ts';
import { IHasCreator } from '../has-creator.ts';

export interface IPostExpand extends IHasTimestamps, IHasCreator {
  postId: Types.ObjectId;
  postImpression: Types.ObjectId;
  viewpointId?: Types.ObjectId;
  botExclude: boolean;
}
