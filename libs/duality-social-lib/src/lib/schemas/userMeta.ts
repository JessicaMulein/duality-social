import { Schema } from "mongoose";
import { IUserMeta } from "../interfaces/userMeta";
export const UserMetaSchema = new Schema<IUserMeta>({
    _id: Schema.Types.ObjectId,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    /**
     * How many posts the user has made.
     */
    totalPosts: { type: Number, default: 0 },
    /**
     * How many replies the user has made.
     */
    totalReplies: { type: Number, default: 0 },
    /**
     * The total number of reactions the user has made on other posts.
     */
    totalReactions: { type: Number, default: 0 },
    /**
     * The total number of reactions the user has received on their posts.
     */
    totalReactionsReceived: { type: Number, default: 0 },
    /**
     * The total number of votes the user has made on other posts.
     */
    totalVotes: { type: Number, default: 0 },
    /**
     * The total number of votes the user has received on their posts.
     */
    totalVotesReceived: { type: Number, default: 0 },
    /**
     * The total number of impressions the user has received on their profile.
     */
    totalProfileViewsReceived: { type: Number, default: 0 },
    /**
     * The total number of impressions the user has received on their posts.
     */
    totalPostViewsReceived: { type: Number, default: 0 },
    /**
     * The total number of impressions the user has received on their replies.
     */
    totalReplyViewsReceived: { type: Number, default: 0 },
  }, { timestamps: true });