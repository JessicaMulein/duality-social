import { Schema } from "mongoose";
import { IHasSoftDelete } from "./hasSoftDelete";
import { IHasTimestampOwners } from "./hasTimestampOwners";
import { IHasTimestamps } from "./hasTimestamps";
import { IHasID } from "./hasId";

export interface IUserMeta extends IHasID, IHasTimestamps, IHasTimestampOwners, IHasSoftDelete {
    _id: Schema.Types.ObjectId;
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