import { Types } from 'mongoose';
import { IHasCreator } from '../has-creator.ts';
import { IHasTimestamps } from '../has-timestamps.ts';

export interface IPostImpression extends IHasTimestamps, IHasCreator {
  postId: Types.ObjectId;
  viewpointId?: Types.ObjectId;
  ip: string;
  botExclude: boolean;
}
