import { IPost, IPostDocument } from '@duality-social/duality-social-lib';
import { Types } from 'mongoose';
import { makePost } from '../../fixtures/post';
import { createMockDocument } from '../create-mock-document';

interface MockedPostModel {
  create: jest.Mock<Promise<IPostDocument>, [Partial<IPost>]>;
  findById: jest.Mock<
    ReturnType<typeof createMockFindById>,
    [string | Types.ObjectId]
  >;
  find: jest.Mock<Promise<IPostDocument[]>, [Record<string, unknown>]>;
  new (postData: Partial<IPost>): IPostDocument;
}

const createMockFindById = (result: IPostDocument | null) => ({
  exec: jest.fn().mockResolvedValue(result),
});

export const PostModel: MockedPostModel = jest.fn(
  (postData: Partial<IPost>) => {
    const post = makePost(postData);
    const mockDocument = createMockDocument<IPostDocument>(() => post);
    return mockDocument;
  },
) as unknown as MockedPostModel;

PostModel.create = jest.fn<Promise<IPostDocument>, [Partial<IPost>]>(
  async (postData: Partial<IPost>) => {
    const post = makePost(postData);
    const mockDocument = createMockDocument<IPostDocument>(() => post);
    return mockDocument;
  },
);

PostModel.findById = jest.fn((id: string | Types.ObjectId) => {
  const post = makePost({
    _id: typeof id === 'string' ? new Types.ObjectId(id) : id,
  });
  return createMockFindById(post);
});

PostModel.find = jest.fn<Promise<IPostDocument[]>, [Record<string, unknown>]>(
  async (query: Record<string, unknown>) => {
    const posts = [makePost(), makePost()];
    return posts.map((post) => {
      const mockDocument = createMockDocument<IPostDocument>(() => post);
      return mockDocument;
    });
  },
);
