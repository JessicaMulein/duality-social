import { IPostViewpoint, IPostViewpointDocument } from '@duality-social/duality-social-lib';
import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import { HumanityTypeEnum, ViewpointTypeEnum } from '@duality-social/duality-social-lib';

export const makePostViewpoint = (overrides = {}): Partial<IPostViewpointDocument> => {
 const viewpoint = {
    postId: new Types.ObjectId(),
    humanity: faker.helpers.arrayElement(Object.values(HumanityTypeEnum)),
    type: faker.helpers.arrayElement(Object.values(ViewpointTypeEnum)),
    lang:  faker.helpers.arrayElement(['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko']),
    pVpId: new Types.ObjectId(),
    content: faker.lorem.paragraph(),
    rendered: faker.lorem.paragraph(),
    translated: faker.datatype.boolean(),
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
      reactionsByType: {
        Angry: faker.number.int({ min: 0, max: 100 }),
        Care: faker.number.int({ min: 0, max: 100 }),
        Celebrate: faker.number.int({ min: 0, max: 100 }),
        Hug: faker.number.int({ min: 0, max: 100 }),
        "Huh?": faker.number.int({ min: 0, max: 100 }),
        Laugh: faker.number.int({ min: 0, max: 100 }),
        Like: faker.number.int({ min: 0, max: 100 }),
        Love: faker.number.int({ min: 0, max: 100 }),
        Sad: faker.number.int({ min: 0, max: 100 }),
        Wow: faker.number.int({ min: 0, max: 100 }),
        Yuck: faker.number.int({ min: 0, max: 100 }),
      },
      humanityByType: {
        Human: faker.number.int({ min: 0, max: 100 }),
        Bot: faker.number.int({ min: 0, max: 100 }),
        Ai: faker.number.int({ min: 0, max: 100 }),
      },
      votes: faker.number.int({ min: 0, max: 100 }),
    },
    ...overrides,
  } as IPostViewpoint;
  return {
    _id: new Types.ObjectId(),
   ...viewpoint,
  } as Partial<IPostViewpointDocument>;
};