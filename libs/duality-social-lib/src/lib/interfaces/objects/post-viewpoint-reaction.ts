import { IHasId } from '../has-id';
import { IPostViewpointReaction } from '../models/post-viewpoint-reaction';

export interface IPostViewpointReactionObject
  extends IPostViewpointReaction,
    IHasId {}
