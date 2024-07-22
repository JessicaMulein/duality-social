import { Model, Schema } from 'mongoose';
import validator from 'validator';
import { AccountStatusTypeEnum } from '../enumerations/accountStatusType';
import { LockTypeEnum } from '../enumerations/lockType';
import { IUser } from '../interfaces/user';
import ModelName from '../enumerations/modelName';
import { UserDocument } from '../documents/user';

/**
 * A user in the system.
 */
export const UserSchema = new Schema<IUser>(
  {
    accountStatusType: {
      type: String,
      enum: AccountStatusTypeEnum,
      default: AccountStatusTypeEnum.Active,
      required: true,
      null: false,
    },
    /**
     * The user's email address, used for login if accountType is email/password.
     * Used for sending notifications, regardless.
     */
    email: {
      type: String,
      unique: true,
      index: true,
      lowercase: true,
      required: true,
      trim: true,
      validate: {
        validator: async function (value: any) {
          if (!validator.isEmail(value)) {
            return false;
          }
          const userModel = this.constructor as Model<UserDocument>;
          const user = await userModel.findOne({ email: value });
          if (user) {
            const currentDocument = this as UserDocument;
            if (user._id === currentDocument._id) {
              return true;
            }
            return false;
          }
          return true;
        },
      },
    },
    /**
     * The unique @username of the user.
     */
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[a-z0-9]+$/, // Alphanumeric validation
      minlength: 3,
      maxlength: 20,
      validate: {
        validator: async function (value: any) {
          const userModel = this.constructor as Model<UserDocument>;
          const user = await userModel.findOne({ username: value });
          if (user) {
            const currentDocument = this as UserDocument;
            if (user._id === currentDocument._id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: 'The username is already in use.',
      },
    },
    languages: {
      type: [String],
      default: [],
    },
    /**
     * Whether the account is under any kind of lock.
     */
    lockStatus: {
      type: String,
      enum: LockTypeEnum,
      default: LockTypeEnum.PendingEmailVerification,
    },
    /**
     * Posts from this account are not included in the main feed.
     * The user sees their own posts.
     */
    shadowBan: { type: Boolean, default: false, required: true, null: false },
    /**
     * The user's profile is not visible to other users (appears deleted).
     */
    userHidden: { type: Boolean, default: false, required: true, null: false },
    /**
     * User's last login date/time.
     * See also logins collection.
     */
    lastLogin: { type: Date, optional: true },
    /**
     * The user who last updated the user.
     */
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      optional: true,
    },
    /**
     * The date/time the user was deleted.
     */
    deletedAt: { type: Date, optional: true },
    /**
     * The user who deleted the user.
     */
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      optional: true,
    },
    metadata: {
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
    }
  },
  { timestamps: true }
);
