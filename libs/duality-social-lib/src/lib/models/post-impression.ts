import { model } from "mongoose";
import { IPostImpressionDocument } from "../documents/post-impression.ts";
import { ModelData } from "../schema-model-data.ts";

export const PostImpressionModel = model<IPostImpressionDocument>(ModelData.PostImpression.name, ModelData.PostImpression.schema, ModelData.PostImpression.collection);