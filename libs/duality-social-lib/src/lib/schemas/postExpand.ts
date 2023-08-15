import { Schema } from 'mongoose';
import { IPostExpand } from '../interfaces/postExpand';
import ModelName from '../enumerations/modelName';

/**
 * Represents a post being expanded.
 * This is used to track the number of times a post has been expanded.
 */
export const PostExpandSchema = new Schema<IPostExpand>({
  /**
   * The id of the post being expanded.
   */
  postId: {
    type: Schema.Types.ObjectId,
    ref: ModelName.Post,
    required: true,
    null: false,
    immutable: true,
  },
  botExclude: { type: Boolean, default: false, required: true, null: false },
  /**
   * The id of the original impression.
   */
  postImpression: {
    type: Schema.Types.ObjectId,
    ref: ModelName.PostImpression,
    required: true,
    null: false,
    immutable: true,
  },
}, { timestamps: true });
