import { model } from 'mongoose';
import { IProfileDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const ProfileModel = model<IProfileDocument>(
  ModelData.Profile.name,
  ModelData.Profile.schema,
  ModelData.Profile.collection,
);
