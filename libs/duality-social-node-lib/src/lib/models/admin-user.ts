import { model } from 'mongoose';
import { IAdminUserDocument } from '@duality-social/duality-social-lib';
import { ModelData } from '../schema-model-data.ts';

export const AdminUserModel = model<IAdminUserDocument>(
  ModelData.AdminUser.name,
  ModelData.AdminUser.schema,
  ModelData.AdminUser.collection,
);
