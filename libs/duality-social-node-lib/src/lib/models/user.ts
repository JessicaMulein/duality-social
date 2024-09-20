import { model } from 'mongoose';
import { IUserDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const UserModel = model<IUserDocument>(
  ModelData.User.name,
  ModelData.User.schema,
  ModelData.User.collection,
);
