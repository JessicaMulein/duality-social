/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import { ObjectId } from 'mongoose';
import { AccountStatusTypeEnum } from '../enumerations/accountStatusType';
import { LockTypeEnum } from '../enumerations/lockType';
import { IHasID } from './hasId';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestampOwners } from './hasTimestampOwners';
import { IHasTimestamps } from './hasTimestamps';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { AdminLevelEnum } from '../enumerations/adminLevel';
import { IHasDeleter } from './hasDeleter';

export const PasswordRounds = 10; 

export interface IUser extends Document, IHasID, IHasTimestamps, IHasTimestampOwners, IHasSoftDelete, IHasDeleter {
    _id?: ObjectId;
    auth0Id: string;
    username: string;
    givenName: string;
    surname: string;
    userPrincipalName: string;
  // duality social specific fields
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
  /**
   * The user's email address, used for login if accountType is email/password.
   * Used for sending notifications, regardless.
   */
    email: string;
  // metadata
    lastLogin?: Date;
  }

  export type UserKeys = { [P in keyof IUser]: P }[keyof IUser];