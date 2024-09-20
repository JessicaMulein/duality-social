import { Schema } from 'mongoose';
import {
  IPostExpandDocument,
  ModelName,
} from '@duality-social/duality-social-lib';

/**
 * Represents a post being expanded.
 * This is used to track the number of times a post has been expanded.
 */
export const PostExpandSchema = new Schema<IPostExpandDocument>(
  {
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
    /**
     * The id of the viewpoint being expanded.
     */
    viewpointId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.PostViewpoint,
      required: false,
      null: true,
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
  },
  { timestamps: true },
);

PostExpandSchema.index({ postId: 1, createdAt: -1 });
