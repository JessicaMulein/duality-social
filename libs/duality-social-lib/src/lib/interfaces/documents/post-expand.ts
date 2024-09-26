import { Document, Types } from 'mongoose';
import { IPostExpand } from '../models/post-expand.ts';

export interface IPostExpandDocument
  extends IPostExpand,
    Document<Types.ObjectId, unknown, IPostExpand> {}
