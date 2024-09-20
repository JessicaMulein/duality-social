import { model } from 'mongoose';
import { IPostViewpointReactionDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const PostViewpointReactionModel = model<IPostViewpointReactionDocument>(
  ModelData.PostViewpointReaction.name,
  ModelData.PostViewpointReaction.schema,
  ModelData.PostViewpointReaction.collection,
);
