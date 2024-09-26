import { IRequestUser } from '../request-user.ts';
import { IApiMessageResponse } from './api-message-response.ts';

export interface IUserResponse extends IApiMessageResponse {
  user: IRequestUser;
}
