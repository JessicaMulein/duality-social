import { Schema } from "mongoose";
import { IHasSoftDelete } from "./hasSoftDelete";
import { IHasTimestampOwners } from "./hasTimestampOwners";
import { IHasTimestamps } from "./hasTimestamps";
import { IHasID } from "./hasId";
import { IUser } from "./user";

export interface IUserMeta extends Document, IHasID, IHasTimestamps, IHasTimestampOwners, IHasSoftDelete {
    userId: IUser['_id'];
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