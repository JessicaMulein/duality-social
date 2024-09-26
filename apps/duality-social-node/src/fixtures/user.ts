import {
  AccountStatusTypeEnum,
  AppConstants,
  HumanityTypeEnum,
  IUser,
  IUserDocument,
  IUserObject,
  LockTypeEnum,
} from '@duality-social/duality-social-lib';
import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';
import { Types } from 'mongoose';

export function makeUser(overrides: Partial<IUserObject> = {}): IUserDocument {
  const creatorId = new Types.ObjectId();
  const createdAt = new Date();
  const newUser: IUser = {
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
  const hashedPassword = hashSync(newUser.password, AppConstants.BcryptRounds);
  return {
    ...newUser,
    _id: new Types.ObjectId(),
    password: hashedPassword,
  } as IUserDocument;
}

export default makeUser;
