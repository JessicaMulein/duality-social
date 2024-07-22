/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { ObjectId } from 'mongoose';
import { AccountStatusTypeEnum } from '../enumerations/accountStatusType';
import { LockTypeEnum } from '../enumerations/lockType';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestampOwners } from './hasTimestampOwners';
import { IHasTimestamps } from './hasTimestamps';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { IHasDeleter } from './hasDeleter';

export const PasswordRounds = 10;

export interface IUser extends IHasTimestamps, IHasTimestampOwners, IHasSoftDelete, IHasDeleter {
  username: string;
  givenName: string;
  surname: string;
  userPrincipalName: string;
  // duality social specific fields
  languages: string[];
  /**
   * Whether the account is under any kind of lock.
   */
  lockStatus: LockTypeEnum;
  /**
   * Whether the user sees their own posts but no one else does.
   */
  shadowBan: boolean;
  /**
   * Whether the user is hidden from the public in search.
   */
  userHidden: boolean;
  /**
   * Current account status/standing
   */
  accountStatusType: AccountStatusTypeEnum;
  humanityType: HumanityTypeEnum,
  /**
   * The user's email address, used for login if accountType is email/password.
   * Used for sending notifications, regardless.
   */
  email: string;
  lastLogin?: Date;
  passwordHash: string;
  // metadata
  metadata: {
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
}