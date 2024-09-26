import { Types } from 'mongoose';
import { IHasTimestampOwners } from '../has-timestamp-owners.ts';
import { IHasTimestamps } from '../has-timestamps.ts';

export interface IUsernameChange extends IHasTimestamps, IHasTimestampOwners {
  userId: Types.ObjectId;
  oldName: string;
  newName: string;
}
