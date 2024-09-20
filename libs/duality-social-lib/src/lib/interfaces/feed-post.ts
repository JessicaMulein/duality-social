import { Types } from 'mongoose';
import { IFeedPostViewpoint } from './feed-post-viewpoint.ts';

export interface IFeedPost {
  id: Types.ObjectId;
  createdAt: Date;
  createdBy: Types.ObjectId;
  viewpoints: IFeedPostViewpoint[];
}
