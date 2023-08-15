import { Schema } from 'mongoose';
import { IPostImpression } from '../interfaces/postImpression';
import ModelName from '../enumerations/modelName';

/**
 * Represents a post being viewed.
 * This is used to track the number of times a post has been viewed.
 */
export const PostImpressionSchema = new Schema<IPostImpression>(
  {
    /**
     * The id of the post being viewed.
     */
    postId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.Post,
      required: true,
      null: false,
      immutable: true,
    },
    /**
     * The ip address of the user viewing the post.
     */
    ip: { type: String, required: true, null: false, immutable: true },
    botExclude: { type: Boolean, default: false, required: true, null: false },
    /**
     * The id of the user viewing the post.
     */
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      null: false,
      immutable: true,
    },
  },
  { timestamps: true }
);
