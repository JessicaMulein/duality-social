import { IPostViewpointDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const PostViewpointModel = model<IPostViewpointDocument>(
  ModelData.PostViewpoint.name,
  ModelData.PostViewpoint.schema,
  ModelData.PostViewpoint.collection,
);
