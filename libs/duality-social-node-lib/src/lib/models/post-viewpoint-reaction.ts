import { IPostViewpointReactionDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const PostViewpointReactionModel = model<IPostViewpointReactionDocument>(
  ModelData.PostViewpointReaction.name,
  ModelData.PostViewpointReaction.schema,
  ModelData.PostViewpointReaction.collection,
);
