import { model } from "mongoose";
import { IEmailTokenDocument } from "../documents/email-token.ts";
import { ModelData } from "../schema-model-data.ts";

export const EmailTokenModel = model<IEmailTokenDocument>(ModelData.EmailToken.name, ModelData.EmailToken.schema, ModelData.EmailToken.collection);