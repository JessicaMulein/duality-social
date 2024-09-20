import { IHasId } from '../has-id';
import { IAdminUser } from '../models/admin-user';

export interface IAdminUserObject extends IAdminUser, IHasId {}
