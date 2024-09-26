import { Document, Types } from 'mongoose';
import { IPostViewpoint } from '../models/post-viewpoint.ts';

export interface IPostViewpointDocument
  extends IPostViewpoint,
    Document<Types.ObjectId, unknown, IPostViewpoint> {}
