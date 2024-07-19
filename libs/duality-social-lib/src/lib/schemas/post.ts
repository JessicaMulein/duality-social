import {  Schema } from 'mongoose';
import { IPost } from '../interfaces/post';
import ModelName from '../enumerations/modelName';

/**
 * Toplevel object represents a post with its two viewpoints
 */
export const PostSchema = new Schema<IPost>(
  {
    depth: { type: Number, default: 0, required: true },
    replyCount: { type: Number, default: 0, required: true },
    lastReplyAt: { type: Date },
    lastReplyBy: { type: Schema.Types.ObjectId, ref: ModelName.User },
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
    imageUrls: [{
      type: String,
      required: true,
      validate: {
        validator: (v: string) => /^(http|https):\/\/[^ "]+$/.test(v),
        message: props => `${props.value} is not a valid URL!`
      }
    }],
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

// Index for efficient querying of posts by parent
PostSchema.index({ parentPostId: 1 });
// Index for efficient querying of posts by the viewpoint they're replying to
PostSchema.index({ inReplyToViewpointId: 1 });
// Index for efficient querying of posts by their input viewpoint
PostSchema.index({ inputViewpointId: 1 });
// Index for efficient querying of posts by their AI-generated viewpoint
PostSchema.index({ aiViewpointId: 1 });
// Index for efficient querying of posts by creator
PostSchema.index({ createdBy: 1 });
// Index for efficient querying of posts by last updater
PostSchema.index({ updatedBy: 1 });
// Index for efficient querying of posts by creation date
PostSchema.index({ hidden: 1, createdAt: -1 });