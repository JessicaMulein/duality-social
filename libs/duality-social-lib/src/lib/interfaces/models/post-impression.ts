import { Types } from 'mongoose';
import { IHasTimestamps } from '../has-timestamps.ts';
import { IHasCreator } from '../has-creator.ts';

export interface IPostImpression extends IHasTimestamps, IHasCreator {
  postId: Types.ObjectId;
  viewpointId?: Types.ObjectId;
  ip: string;
  botExclude: boolean;
}
