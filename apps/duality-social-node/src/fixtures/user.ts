import { Types } from 'mongoose';
import { hashSync } from 'bcrypt';
import { faker } from '@faker-js/faker';
import {
  AccountStatusTypeEnum,
  AppConstants,
  HumanityTypeEnum,
  IUser,
  IUserDocument,
  LockTypeEnum,
} from '@duality-social/duality-social-lib';

export function makeUser(overrides = {}): IUser {
  const creatorId = new Types.ObjectId();
  const createdAt = new Date();
  return {
    username: faker.internet.userName(),
    languages: ['en'],
    lockStatus: LockTypeEnum.Unlocked,
    shadowBan: false,
    userHidden: false,
    accountStatusType: AccountStatusTypeEnum.Active,
    humanityType: HumanityTypeEnum.Human,
    email: faker.internet.email(),
    emailVerified: true,
    password: faker.internet.password(),
    timezone: faker.location.timeZone(),
    createdAt: createdAt,
    updatedAt: createdAt,
    createdBy: creatorId,
    updatedBy: creatorId,
    metadata: {
      totalPosts: 0,
      totalReactionsReceived: 0,
      totalReactions: 0,
      totalVotes: 0,
      totalVotesReceived: 0,
      totalReplies: 0,
      totalProfileViewsReceived: 0,
      totalPostViewsReceived: 0,
      totalReplyViewsReceived: 0,
    },
    ...overrides,
  };
}

export function getUserDoc(newUser: IUser): IUserDocument {
  const hashedPassword = hashSync(newUser.password, AppConstants.BcryptRounds);
  const newUserData: IUserDocument = {
    ...newUser,
    _id: new Types.ObjectId(),
    password: hashedPassword,
  } as IUserDocument;
  return newUserData;
}
