import { IAdminUserDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const AdminUserModel = model<IAdminUserDocument>(
  ModelData.AdminUser.name,
  ModelData.AdminUser.schema,
  ModelData.AdminUser.collection,
);
