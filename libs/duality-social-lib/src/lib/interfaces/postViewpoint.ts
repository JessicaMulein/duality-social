import { ObjectId } from 'mongoose';
import { HumanityTypeEnum } from '../enumerations/humanityType';
import { ViewpointTypeEnum } from '../enumerations/viewpointType';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestamps } from './hasTimestamps';
import { IHasDeleter } from './hasDeleter';

export interface IPostViewpoint extends IHasTimestamps, IHasSoftDelete, IHasDeleter {
  /**
   * Correlation id to link the dualities.
   */
  postId: ObjectId;
  replies: number;
  /**
   * What type of entity created this post.
   */
  humanity: HumanityTypeEnum;
  /**
   * The raw content of the viewpoint.
   */
  content: string;
  /**
   * Pre-rendered content of the viewpoint.
   */
  rendered: string;
  /**
   * Whether the content is a translation.
   */
  translated: boolean;
  /**
   * The language of the content.
   */
  lang: string;
  /**
   * The id of the parent viewpoint if this is a reply.
   */
  pVpId?: ObjectId;
  metadata: {
    expands: number;
    impressions: number;
    reactions:  number;
    reactionsByType: { [key: string]: number };
  };
  type: ViewpointTypeEnum;
  createdBy: ObjectId;
  updatedBy: ObjectId;
}