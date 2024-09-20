import { Document, Types } from 'mongoose';
import { IProfile } from '../models/profile.ts';

export interface IProfileDocument
  extends IProfile,
    Document<Types.ObjectId, unknown, unknown> {}
