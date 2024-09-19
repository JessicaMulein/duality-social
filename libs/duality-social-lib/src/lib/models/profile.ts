import { model } from "mongoose";
import { IProfileDocument } from "../documents/profile.ts";
import { ModelData } from "../schema-model-data.ts";

export const ProfileModel = model<IProfileDocument>(ModelData.Profile.name, ModelData.Profile.schema, ModelData.Profile.collection);