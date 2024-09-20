import { model } from 'mongoose';
import { IPostDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const PostModel = model<IPostDocument>(
  ModelData.Post.name,
  ModelData.Post.schema,
  ModelData.Post.collection,
);
