import { IHasId } from '../has-id';
import { IUser } from '../models/user';

export interface IUserObject extends IUser, IHasId {}
