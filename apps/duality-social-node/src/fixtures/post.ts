import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import {
  DefaultReactionsTypeEnum,
  IPost,
  IPostDocument,
} from '@duality-social/duality-social-lib';

export const makePost = (overrides = {}): Partial<IPostDocument> => {
  const post = {
    depth: faker.number.int({ min: 1, max: 10 }),
    lastReplyAt: faker.date.recent(),
    lastReplyBy: new Types.ObjectId(),
    pId: new Types.ObjectId(),
    pIds: [new Types.ObjectId()],
    vpId: undefined,
    vpPIds: [],
    inVpId: new Types.ObjectId(),
    inVpTransIds: [new Types.ObjectId()],
    aiVpId: new Types.ObjectId(),
    aiVpTransIds: [new Types.ObjectId()],
    reqTransLangs: [
      faker.helpers.arrayElement([
        'en',
        'es',
        'fr',
        'de',
        'it',
        'pt',
        'ru',
        'zh',
        'ja',
        'ko',
      ]),
    ],
    aiReqTransLangs: [
      faker.helpers.arrayElement([
        'en',
        'es',
        'fr',
        'de',
        'it',
        'pt',
        'ru',
        'zh',
        'ja',
        'ko',
      ]),
    ],
    imageUrls: [faker.internet.url()],
    hidden: faker.datatype.boolean(),
    deletedAt: faker.date.recent(),
    createdAt: faker.date.recent(),
    createdBy: new Types.ObjectId(),
    deletedBy: new Types.ObjectId(),
    updatedAt: faker.date.recent(),
    updatedBy: new Types.ObjectId(),
    metadata: {
      replies: faker.number.int({ min: 0, max: 100 }),
      expands: faker.number.int({ min: 0, max: 100 }),
      impressions: faker.number.int({ min: 0, max: 100 }),
      reactions: faker.number.int({ min: 0, max: 100 }),
      reactionsByType: Object.fromEntries(
        Object.values(DefaultReactionsTypeEnum).map((type) => [
          type,
          faker.number.int({ min: 0, max: 100 }),
        ]),
      ),
      votes: faker.number.int({ min: 0, max: 100 }),
    },
    procLock: {
      id: faker.string.uuid(),
      date: faker.date.recent(),
    },
    ...overrides,
  } as IPost;
  return {
    _id: new Types.ObjectId(),
    ...post,
  } as Partial<IPostDocument>;
};
