import { Document, Types } from 'mongoose';
import { IUser } from '../models/user.ts';

export interface IUserDocument
  extends IUser,
    Document<Types.ObjectId, unknown, unknown> {}
