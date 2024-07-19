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
    replyCount: { type: Number, default: 0, required: true },
    /**
     * What type of entity created this post.
     */
    humanityType: {
      type: String,
      enum: HumanityTypeEnum,
      required: true,
      immutable: true,
    },
    viewpointType: {
      type: String,
      enum: ViewpointTypeEnum,
      required: true,
      immutable: true,
    },
    /**
     * The language the post is in- ISO language code, eg 'en-US' or 'en'
     */
    language: {
      type: String,
      required: true,
      immutable: true,
    },
    /**
     * The id of the parent viewpoint if this is a reply.
     */
    parentViewpointId: {
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
    contentRendered: { type: String, required: false },
    /**
     * Whether the content is a translation.
     */
    isTranslation: { type: Boolean, required: true, default: false },
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
    meta: {
      expands: Number,
      impressions: Number,
      reactions: Number,
    },
  },
  { timestamps: true }
);

PostViewpointSchema.index({ postId: 1, humanityType: 1 });
PostViewpointSchema.index({ postId: 1, viewpointType: 1 });
PostViewpointSchema.index({ parentViewpointId: 1, createdAt: -1 });