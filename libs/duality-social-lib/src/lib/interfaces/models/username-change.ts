import { Types } from 'mongoose';
import { IHasTimestamps } from '../has-timestamps.ts';
import { IHasTimestampOwners } from '../has-timestamp-owners.ts';

export interface IUsernameChange extends IHasTimestamps, IHasTimestampOwners {
  userId: Types.ObjectId;
  oldName: string;
  newName: string;
}
