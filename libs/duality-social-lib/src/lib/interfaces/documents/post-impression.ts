import { Document, Types } from 'mongoose';
import { IPostImpression } from '../models/post-impression.ts';

export interface IPostImpressionDocument
  extends IPostImpression,
    Document<Types.ObjectId, unknown, unknown> {}
