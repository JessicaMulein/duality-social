import {
  IPostViewpoint,
  IPostViewpointDocument,
} from '@duality-social/duality-social-lib';
import { Types } from 'mongoose';
import { makePostViewpoint } from '../../fixtures/post-viewpoint';
import { createMockDocument } from '../create-mock-document';

interface MockedPostViewpointModel {
  create: jest.Mock<Promise<IPostViewpointDocument>, [Partial<IPostViewpoint>]>;
  findById: jest.Mock<
    ReturnType<typeof createMockFindById>,
    [string | Types.ObjectId]
  >;
  find: jest.Mock<Promise<IPostViewpointDocument[]>, [Record<string, unknown>]>;
  new (viewpointData: Partial<IPostViewpoint>): IPostViewpointDocument;
}

const createMockFindById = (result: IPostViewpointDocument | null) => ({
  exec: jest.fn().mockResolvedValue(result),
});

export const PostViewpointModel: MockedPostViewpointModel = jest.fn(
  (viewpointData: Partial<IPostViewpoint>) => {
    const viewpoint = makePostViewpoint(viewpointData);
    const mockDocument = createMockDocument<IPostViewpointDocument>(
      () => viewpoint,
    );
    return mockDocument;
  },
) as unknown as MockedPostViewpointModel;

PostViewpointModel.create = jest.fn<
  Promise<IPostViewpointDocument>,
  [Partial<IPostViewpoint>]
>(async (viewpointData: Partial<IPostViewpoint>) => {
  const viewpoint = makePostViewpoint(viewpointData);
  const mockDocument = createMockDocument<IPostViewpointDocument>(
    () => viewpoint,
  );
  return mockDocument;
});

PostViewpointModel.findById = jest.fn((id: string | Types.ObjectId) =>
  createMockFindById(
    makePostViewpoint({
      _id: typeof id === 'string' ? new Types.ObjectId(id) : id,
    }),
  ),
);

PostViewpointModel.find = jest.fn<
  Promise<IPostViewpointDocument[]>,
  [Record<string, unknown>]
>(async (query: Record<string, unknown>) => {
  const viewpoints = [makePostViewpoint(), makePostViewpoint()];
  return viewpoints.map((viewpoint) => {
    const mockDocument = createMockDocument<IPostViewpointDocument>(
      () => viewpoint,
    );
    return mockDocument;
  });
});
