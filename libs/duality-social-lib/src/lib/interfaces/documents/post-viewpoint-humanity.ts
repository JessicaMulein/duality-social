import { Document, Types } from 'mongoose';
import { IPostViewpointHumanity } from '../models/post-viewpoint-humanity.ts';

export interface IPostViewpointHumanityDocument
  extends IPostViewpointHumanity,
    Document<Types.ObjectId, unknown, unknown> {}
