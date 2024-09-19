import { model } from "mongoose";
import { IPostViewpointHumanityDocument } from "../documents/post-viewpoint-humanity.ts";
import { ModelData } from "../schema-model-data.ts";

export const PostViewpointHumanityModel = model<IPostViewpointHumanityDocument>(ModelData.PostViewpointHumanity.name, ModelData.PostViewpointHumanity.schema, ModelData.PostViewpointHumanity.collection);