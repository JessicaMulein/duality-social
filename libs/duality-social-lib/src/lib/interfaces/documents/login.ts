import { Document, Types } from 'mongoose';
import { ILogin } from '../models/login.ts';

export interface ILoginDocument
  extends ILogin,
    Document<Types.ObjectId, unknown, unknown> {}
