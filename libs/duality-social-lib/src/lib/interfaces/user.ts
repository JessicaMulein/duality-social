/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { ObjectId } from 'mongoose';
import { AccountLoginTypeEnum } from '../enumerations/accountLoginType';
import { AccountStatusTypeEnum } from '../enumerations/accountStatusType';
import { LockTypeEnum } from '../enumerations/lockType';
import { IHasID } from './hasId';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestampOwners } from './hasTimestampOwners';
import { IHasTimestamps } from './hasTimestamps';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { AdminLevelEnum } from '../enumerations/adminLevel';

export const PasswordRounds = 10; 

export interface IUser extends IHasID, IHasTimestamps, IHasTimestampOwners, IHasSoftDelete {
    _id?: ObjectId;
    username: string;
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
    adminLevel: AdminLevelEnum;
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
    accountPasswordHash?: string,
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
    lastLogin?: Date;
    createdAt: Date;
    createdBy: IUser['_id'];
    updatedAt: Date;
    updatedBy: IUser['_id']; 
    deletedAt?: Date;
    deletedBy?: IUser['_id'];
  }

  export type UserKeys = { [P in keyof IUser]: P }[keyof IUser];