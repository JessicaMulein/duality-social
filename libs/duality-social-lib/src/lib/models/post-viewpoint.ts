import { model } from "mongoose";
import { IPostViewpointDocument } from "../documents/post-viewpoint.ts";
import { ModelData } from "../schema-model-data.ts";

export const PostViewpointModel = model<IPostViewpointDocument>(ModelData.PostViewpoint.name, ModelData.PostViewpoint.schema, ModelData.PostViewpoint.collection);