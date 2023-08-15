import {  Schema } from 'mongoose';
import { IPost } from '../interfaces/post';
import ModelName from '../enumerations/modelName';

/**
 * Toplevel object represents a post with its two viewpoints
 */
export const PostSchema = new Schema<IPost>(
  {
    /**
     * The id of the parent post if this is a reply.
     */
    parentPostId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.Post,
      optional: true,
      default: null,
      readonly: true,
    },
    inputViewpointId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.PostViewpoint,
      optional: true,
      required: false,
    },
    inputViewpointTranslationIds: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelName.PostViewpoint,
        required: true,
      },
    ],
    aiViewpointId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.PostViewpoint,
      required: false,
      optional: true,
    },
    aiViewpointTranslationIds: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelName.PostViewpoint,
        required: true,
      },
    ],
    imageUrls: [{ type: String, required: true }],
    hidden: { type: Boolean, default: false, required: true },
    deletedAt: { type: Date, optional: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      immutable: true,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      optional: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
    },
    meta: {
      expands: Number,
      impressions: Number,
      reactions: Number,
    },
  },
  { timestamps: true }
);
