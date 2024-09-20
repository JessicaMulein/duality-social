import { IHasId } from '../has-id';
import { ILogin } from '../models/login';

export interface ILoginObject extends ILogin, IHasId {}
