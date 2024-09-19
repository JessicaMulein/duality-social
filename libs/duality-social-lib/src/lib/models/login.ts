import { model } from "mongoose";
import { ILoginDocument } from "../documents/login.ts";
import { ModelData } from "../schema-model-data.ts";

export const LoginModel = model<ILoginDocument>(ModelData.Login.name, ModelData.Login.schema, ModelData.Login.collection);