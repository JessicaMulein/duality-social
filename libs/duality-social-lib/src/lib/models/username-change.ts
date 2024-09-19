import { model } from "mongoose";
import { IUsernameChangeDocument } from "../documents/username-change.ts";
import { ModelData } from "../schema-model-data.ts";

export const UsernameChangeModel = model<IUsernameChangeDocument>(ModelData.UsernameChange.name, ModelData.UsernameChange.schema, ModelData.UsernameChange.collection);