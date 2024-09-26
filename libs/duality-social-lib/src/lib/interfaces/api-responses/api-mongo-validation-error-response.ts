import { IMongoErrors } from '../mongo-errors.ts';
import { IApiMessageResponse } from './api-message-response.ts';

export interface IApiMongoValidationErrorResponse extends IApiMessageResponse {
  errors: IMongoErrors;
}
