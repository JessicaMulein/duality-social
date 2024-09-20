import { Document, Types } from 'mongoose';
import { IUsernameChange } from '../models/username-change.ts';

export interface IUsernameChangeDocument
  extends IUsernameChange,
    Document<Types.ObjectId, unknown, unknown> {}
