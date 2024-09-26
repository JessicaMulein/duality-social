import { ILoginDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const LoginModel = model<ILoginDocument>(
  ModelData.Login.name,
  ModelData.Login.schema,
  ModelData.Login.collection,
);
