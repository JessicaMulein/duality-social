import { Document, Types } from 'mongoose';
import { IPostViewpointReaction } from '../models/post-viewpoint-reaction.ts';

export interface IPostViewpointReactionDocument
  extends IPostViewpointReaction,
    Document<Types.ObjectId, unknown, unknown> {}
