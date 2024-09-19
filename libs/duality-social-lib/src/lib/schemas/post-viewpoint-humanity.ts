import { Schema } from "mongoose";
import ModelName from "../enumerations/model-name.ts";
import { HumanityTypeEnum } from "../enumerations/humanity-type.ts";
import { IPostViewpointHumanityDocument } from "../documents/post-viewpoint-humanity.ts";

export const PostViewpointHumanitySchema = new Schema<IPostViewpointHumanityDocument>({
    viewpointId: { type: Schema.Types.ObjectId, ref: ModelName.PostViewpoint, required: true, immutable: true },
    humanity: { type: String, required: true, enum: Object.values(HumanityTypeEnum), immutable: true },
    createdBy: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true, immutable: true },
}, { timestamps: true });