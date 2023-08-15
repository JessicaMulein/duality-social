import { Schema } from 'mongoose';
import { IViewpointReaction } from '../interfaces/viewpointReaction';
import ModelName from '../enumerations/modelName';
export const ViewpointReactionSchema = new Schema<IViewpointReaction>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.Post,
      required: true,
      unique: true,
      immutable: true,
    },
    viewpointId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.PostViewpoint,
      required: true,
      unique: true,
      immutable: true,
    },
    reaction: { type: String, required: true, immutable: true },
    reactionType: { type: String, required: true, immutable: true },
    /**
     * The id of the user that created this reaction.
     */
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      unique: true,
      immutable: true,
    },
    /**
     * Whether this reaction has been hidden from the statistics and reaction lists.
     * This could be used to exclude reactions from bots or other situations.
     */
    hidden: { type: Boolean, default: true, required: true },
    /**
     * Whether this reaction has been deleted.
     */
    deletedAt: { type: Date, required: false, optional: true },
  },
  { timestamps: true }
);
