import { model } from "mongoose";
import { IRoleDocument } from "../documents/role.ts";
import { ModelData } from "../schema-model-data.ts";

export const RoleModel = model<IRoleDocument>(ModelData.Role.name, ModelData.Role.schema, ModelData.Role.collection);