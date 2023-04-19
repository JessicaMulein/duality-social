import { Schema } from "mongoose";

export interface IUserMeta {
    userId: Schema.Types.ObjectId;
    /**
     * How many posts the user has made.
     */
    totalPosts: number;
    /**
     * How many replies the user has made.
     */
    totalReplies: number;
    /**
     * The total number of reactions the user has made on other posts.
     */
    totalReactions: number;
    /**
     * The total number of reactions the user has received on their posts.
     */
    totalReactionsReceived: number;
    /**
     * The total number of votes the user has made on other posts.
     */
    totalVotes: number;
    /**
     * The total number of votes the user has received on their posts.
     */
    totalVotesReceived: number;
    /**
     * The total number of impressions the user has received on their profile.
     */
    totalProfileViewsReceived: number;
    /**
     * The total number of impressions the user has received on their posts.
     */
    totalPostViewsReceived: number;
    /**
     * The total number of impressions the user has received on their replies.
     */
    totalReplyViewsReceived: number;
  }

  export type UserMetaKeys = { [P in keyof IUserMeta]: P }[keyof IUserMeta];