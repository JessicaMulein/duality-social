import { IRoleDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const RoleModel = model<IRoleDocument>(
  ModelData.Role.name,
  ModelData.Role.schema,
  ModelData.Role.collection,
);
