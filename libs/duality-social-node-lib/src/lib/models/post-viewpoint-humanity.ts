import { model } from 'mongoose';
import { IPostViewpointHumanityDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const PostViewpointHumanityModel = model<IPostViewpointHumanityDocument>(
  ModelData.PostViewpointHumanity.name,
  ModelData.PostViewpointHumanity.schema,
  ModelData.PostViewpointHumanity.collection,
);
