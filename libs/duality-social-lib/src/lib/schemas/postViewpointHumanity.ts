import { Schema } from "mongoose";
import { IPostViewpointHumanity } from "../interfaces/postViewpointHumanity";
import ModelName from "../enumerations/modelName";
import { HumanityTypeEnum } from "../enumerations/humanityType";

export const PostViewpointHumanitySchema = new Schema<IPostViewpointHumanity>({
    viewpointId: { type: Schema.Types.ObjectId, ref: ModelName.PostViewpoint, required: true, immutable: true },
    humanity: { type: String, required: true, enum: Object.values(HumanityTypeEnum), immutable: true },
    createdBy: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true, immutable: true },
}, { timestamps: true });