import { Document, Types } from 'mongoose';
import { IAdminUser } from '../models/admin-user.ts';

export interface IAdminUserDocument
  extends IAdminUser,
    Document<Types.ObjectId, unknown, unknown> {}
