import { IPostViewpointHumanityDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const PostViewpointHumanityModel = model<IPostViewpointHumanityDocument>(
  ModelData.PostViewpointHumanity.name,
  ModelData.PostViewpointHumanity.schema,
  ModelData.PostViewpointHumanity.collection,
);
