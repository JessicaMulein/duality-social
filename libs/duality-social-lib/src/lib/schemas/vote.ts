import { Schema } from "mongoose";
import { IVote } from "../interfaces/vote";
import ModelName from "../enumerations/modelName";
import { HumanityTypeEnum } from "../enumerations/humanityType";

export const VoteSchema = new Schema<IVote>({
    postId: { type: Schema.Types.ObjectId, ref: ModelName.Post, required: true, immutable: true },
    humanity: { type: String, required: true, enum: Object.values(HumanityTypeEnum), immutable: true },
    createdBy: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true, immutable: true },
}, { timestamps: true });