import { IHasId } from '../has-id';
import { IPost } from '../models/post';

export interface IPostObject extends IPost, IHasId {}
