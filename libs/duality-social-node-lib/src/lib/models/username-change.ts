import { model } from 'mongoose';
import { IUsernameChangeDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const UsernameChangeModel = model<IUsernameChangeDocument>(
  ModelData.UsernameChange.name,
  ModelData.UsernameChange.schema,
  ModelData.UsernameChange.collection,
);
