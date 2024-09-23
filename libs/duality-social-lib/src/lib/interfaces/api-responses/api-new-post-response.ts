import { IPostViewpointObject } from '../objects/post-viewpoint.ts';
import { IPostObject } from '../objects/post.ts';
import { IApiMessageResponse } from './api-message-response.ts';

export interface IApiNewPostResponse extends IApiMessageResponse {
  post: IPostObject;
  viewpoint: IPostViewpointObject;
}
