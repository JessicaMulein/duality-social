import { Document, Types } from 'mongoose';
import { IPost } from '../models/post.ts';

export interface IPostDocument
  extends IPost,
    Document<Types.ObjectId, unknown, unknown> {}
