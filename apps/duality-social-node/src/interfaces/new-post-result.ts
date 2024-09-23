import {
  IPostDocument,
  IPostViewpointDocument,
} from '@duality-social/duality-social-lib';

export interface INewPostResult {
  post: IPostDocument;
  viewpoint: IPostViewpointDocument;
}
