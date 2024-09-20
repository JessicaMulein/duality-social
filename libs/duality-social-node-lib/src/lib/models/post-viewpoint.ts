import { model } from 'mongoose';
import { IPostViewpointDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const PostViewpointModel = model<IPostViewpointDocument>(
  ModelData.PostViewpoint.name,
  ModelData.PostViewpoint.schema,
  ModelData.PostViewpoint.collection,
);
