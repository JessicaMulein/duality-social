import { Types } from 'mongoose';
import { IHasCreator } from '../has-creator.ts';
import { IHasTimestamps } from '../has-timestamps.ts';

export interface ISudoLog extends IHasCreator, IHasTimestamps {
  userId: Types.ObjectId;
  adminUserId: Types.ObjectId;
  success: boolean;
}
