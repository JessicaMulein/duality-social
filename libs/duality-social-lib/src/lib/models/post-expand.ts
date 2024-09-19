import { model } from "mongoose";
import { IPostExpandDocument } from "../documents/post-expand.ts";
import { ModelData } from "../schema-model-data.ts";

export const PostExpandModel = model<IPostExpandDocument>(ModelData.PostExpand.name, ModelData.PostExpand.schema, ModelData.PostExpand.collection);