import { model } from 'mongoose';
import { IPostImpressionDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const PostImpressionModel = model<IPostImpressionDocument>(
  ModelData.PostImpression.name,
  ModelData.PostImpression.schema,
  ModelData.PostImpression.collection,
);
