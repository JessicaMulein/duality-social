import { Schema } from 'mongoose';
import { IPost } from '../interfaces/post';
import ModelName from '../enumerations/modelName';

/**
 * Toplevel object represents a post with its two viewpoints
 */
export const PostSchema = new Schema<IPost>(
  {
    depth: { type: Number, required: true },
    replies: { type: Number, default: 0, required: true },
    lastReplyAt: { type: Date },
    lastReplyBy: { type: Schema.Types.ObjectId, ref: ModelName.User },
    /**
     * The id of the parent post if this is a reply.
     */
    pId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.Post,
      optional: true,
      default: null,
      readonly: true,
    },
    inVpId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.PostViewpoint,
      optional: true,
      required: false,
    },
    inVpTransIds: [
      {
        type: Schema.Types.ObjectId,
        ref: ModelName.PostViewpoint,
        required: true,
      },
    ],
    aiVpId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.PostViewpoint,
      required: false,
      optional: true,
    },
    aiVpTransIds: [
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
    metadata: {
      expands: Number,
      impressions: Number,
      reactions: Number,
      reactionsByType: {
        type: Map,
        of: Number,
        required: true,
      },
    },
    procLockId: { type: String, required: false },
    procLockDate: { type: Date, required: false },
  },
  { timestamps: true }
);

// Index for efficient querying of posts by parent
PostSchema.index({ parentId: 1 }, { name: 'parentPostId_index' });
// Index for efficient querying of posts by the viewpoint they're replying to
PostSchema.index({ replyVpId: 1 }, { name: 'inReplyToViewpointId_index' });
// Index for efficient querying of posts by their input viewpoint
PostSchema.index({ inVpId: 1 }, { name: 'inputViewpointId_index' });
// Index for efficient querying of posts by their AI-generated viewpoint
PostSchema.index({ aiVpId: 1 }, { name: 'aiViewpointId_index' });
// Index for efficient querying of posts by creator
PostSchema.index({ createdBy: 1 }, { name: 'createdBy_index' });
// Index for efficient querying of posts by last updater
PostSchema.index({ updatedBy: 1 }, { name: 'updatedBy_index' });
// Index for efficient querying of posts by creation date
PostSchema.index({ hidden: 1, createdAt: -1, deletedAt: -1 }, { name: 'feed_index' });
// Index for efficient querying of posts by processing lock
PostSchema.index({ procLockId: 1 }, { name: 'processing_lock_index' });
// Index for efficient querying of posts by multiple fields
PostSchema.index({
  hidden: 1,
  deletedAt: 1,
  procLockId: 1,
  inVpId: 1,
  aiVpId: 1
}, { name: 'feed_query_optimization_index' });