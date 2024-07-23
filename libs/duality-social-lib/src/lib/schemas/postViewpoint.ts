import { Schema } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { ViewpointTypeEnum } from '../enumerations/viewpointType';
import { IPostViewpoint } from '../interfaces/postViewpoint';
import ModelName from '../enumerations/modelName';

export const PostViewpointSchema = new Schema<IPostViewpoint>(
  {
    /**
     * Correlation id to link the dualities.
     */
    postId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.Post,
      required: true,
      immutable: true,
    },
    replies: { type: Number, default: 0, required: true },
    /**
     * What type of entity created this post.
     */
    humanity: {
      type: String,
      enum: HumanityTypeEnum,
      required: true,
      immutable: true,
    },
    type: {
      type: String,
      enum: ViewpointTypeEnum,
      required: true,
      immutable: true,
    },
    /**
     * The language the post is in- ISO language code, eg 'en-US' or 'en'
     */
    lang: {
      type: String,
      required: true,
      immutable: true,
    },
    /**
     * The id of the parent viewpoint if this is a reply.
     */
    pVpId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.PostViewpoint,
      optional: true,
      immutable: true,
    },
    /**
     * The actual content.
     */
    content: { type: String, required: true, immutable: true },
    /**
     * Whether the content has been pre-rendered.
     * Not immutable because rendering may be improved or changed
     */
    rendered: { type: String, required: false },
    /**
     * Whether the content is a translation.
     */
    translated: { type: Boolean, required: true, default: false },
    deletedAt: { type: Date, optional: true },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
      immutable: true,
    },
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
    metadata: {
      expands: Number,
      impressions: Number,
      reactions: Number,
      aiVotes: Number,
      botVotes: Number,
      humanVotes: Number,
      reactionsByType: {
        type: Map,
        of: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

PostViewpointSchema.index({ postId: 1, humanityType: 1 });
PostViewpointSchema.index({ postId: 1, type: 1 });
PostViewpointSchema.index({ parentViewpointId: 1, createdAt: -1 });
