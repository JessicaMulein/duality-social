import { Schema } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { ViewpointTypeEnum } from '../enumerations/viewpointType';
import { IPostViewpointMeta } from './postViewpointMeta';
import { IHasID } from './hasId';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestamps } from './hasTimestamps';
import { IUser } from './user';
import { IPost } from './post';
import { IHasDeleter } from './hasDeleter';

export interface IPostViewpoint extends IHasID, IHasTimestamps, IHasSoftDelete, IHasDeleter {
  /**
   * Correlation id to link the dualities.
   */
  postId: IPost['_id'];
  replyCount: number;
  /**
   * What type of entity created this post.
   */
  humanityType: HumanityTypeEnum;
  /**
   * The raw content of the viewpoint.
   */
  content: string;
  /**
   * Pre-rendered content of the viewpoint.
   */
  contentRendered: string;
  /**
   * Whether the content is a translation.
   */
  isTranslation: boolean;
  /**
   * The language of the content.
   */
  language: string;
  /**
   * The id of the parent viewpoint if this is a reply.
   */
  parentViewpointId?: IPostViewpoint['_id'];
  meta: IPostViewpointMeta;
  viewpointType: ViewpointTypeEnum;
  createdBy: IUser['_id'];
  updatedBy: IUser['_id'];
}