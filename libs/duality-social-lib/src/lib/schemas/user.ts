import { Model, Schema } from 'mongoose';
import { AccountStatusTypeEnum } from '../enumerations/accountStatusType';
import { AccountLoginTypeEnum } from '../enumerations/accountLoginType';
import { AdminLevelEnum } from '../enumerations/adminLevel';
import { LockTypeEnum } from '../enumerations/lockType';
import { IUser } from '../interfaces/user';
import { IHasID } from '../interfaces/hasId';

/**
 * A user in the system.
 */
export const UserSchema = new Schema<IUser>(
  {
    /**
     * Whether the login is via email/password or via external authentication.
     */
    accountType: {
      type: String,
      enum: AccountLoginTypeEnum,
      default: AccountLoginTypeEnum.Microsoft,
      required: true,
    },
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
    email: { type: String, unique: true, index: true, optional: true },
    /**
     * Whether the user has verified their email address.
     * See also a record in the email verification collection.
     */
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
      null: false,
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
          const userModel = this.constructor as Model<IUser>;
          const user = await userModel.findOne({ username: value });
          if (user) {
            const currentDocument = this as IHasID
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
    /**
     * Quick reference field for whether the user is an administrator.
     * Backed up by a record in the adminUsers collection with their
     * sudo password hash and other admin metadata.
     */
    adminLevel: {
      type: String,
      enum: AdminLevelEnum,
      default: AdminLevelEnum.User,
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
      ref: 'User',
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
      ref: 'User',
      optional: true,
    },
    /**
     * Whether the account is under any kind of lock.
     */
    adminFreezeType: {
      type: String,
      enum: LockTypeEnum,
      default: LockTypeEnum.PendingEmailVerification,
    },
  },
  { timestamps: true }
);
