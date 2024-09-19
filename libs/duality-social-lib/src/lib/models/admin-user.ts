import { model } from "mongoose";
import { IAdminUserDocument } from "../documents/admin-user.ts";
import { ModelData } from "../schema-model-data.ts";

export const AdminUserModel = model<IAdminUserDocument>(ModelData.AdminUser.name, ModelData.AdminUser.schema, ModelData.AdminUser.collection);