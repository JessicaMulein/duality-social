/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { Document } from 'mongoose';
import { AccountLoginTypeEnum } from '../enumerations/accountLoginType';
import { AccountStatusTypeEnum } from '../enumerations/accountStatusType';
import { LockTypeEnum } from '../enumerations/lockType';
import { IHasID } from './hasId';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestampOwners } from './hasTimestampOwners';
import { IHasTimestamps } from './hasTimestamps';
import { IUserMeta } from './userMeta';

declare global {
  namespace Express {
      interface User {}
  }
}

export interface IUser extends Express.User, IHasID, IHasTimestamps, IHasTimestampOwners, IHasSoftDelete, Document {
  // graphql fields
    givenName: string;
    surname: string;
    userPrincipalName: string;
  // duality social specific fields
  /**
   * Whether the user is allowed to login.
   */
    canLogin: boolean;
  /**
   * Whether the login is via email/password or via external authentication.
   */
    accountType: AccountLoginTypeEnum;
  /**
   * Whether the account is under any kind of lock.
   */
    adminFreezeType: LockTypeEnum;

    /**
     * Current account status/standing
     */
    accountStatusType: AccountStatusTypeEnum;
  /**
   * The user's email address, used for login if accountType is email/password.
   * Used for sending notifications, regardless.
   */
    accountEmail?: string;
  /**
   * Whether the user has verified their email address.
   * See also a record in the email verification collection.
   */
    emailVerified: boolean;
  // metadata
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deletedBy?: IUser['_id'];
    meta: IUserMeta;
  }

  export type UserKeys = { [P in keyof IUser]: P }[keyof IUser];