import { Schema } from 'mongoose';
import ModelName from '../enumerations/modelName';
import { IPostViewpointReaction } from '../interfaces/postViewpointReaction';

/**
 * Represents a user reacting to a viewpoint
 */
export const PostViewpointReactionSchema = new Schema<IPostViewpointReaction>({
    postId: { type: Schema.Types.ObjectId, ref: ModelName.Post, required: true, null: false, immutable: true },
    viewpointId: { type: Schema.Types.ObjectId, ref: ModelName.PostViewpoint, required: true, null: false, immutable: true },
    reaction: { type: String, required: true, null: false, immutable: true },
    createdBy: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true, null: false, immutable: true },
}, { timestamps: true });