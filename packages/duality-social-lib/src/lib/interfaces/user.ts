import { Document, Schema } from 'mongoose';
import { LockStatus } from '../enumerations/lock-status';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  lastFailedLogin?: Date;
  lastLogin?: Date;
  lockExpiration?: Date;
  lockStatus: LockStatus;
  username: string;
  password: string;
  tz?: string;
  createdAt: Date;
  updatedAt: Date;
}