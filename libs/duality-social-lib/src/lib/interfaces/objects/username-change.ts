import { IHasId } from '../has-id';
import { IUsernameChange } from '../models/username-change';

export interface IUsernameChangeObject extends IUsernameChange, IHasId {}
