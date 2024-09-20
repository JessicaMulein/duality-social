import { IHasId } from '../has-id';
import { IProfile } from '../models/profile';

export interface IProfileObject extends IProfile, IHasId {}
