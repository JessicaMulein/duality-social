import { IApiMessageResponse } from './api-message-response.ts';
import { IMongoErrors } from '../mongo-errors.ts';

export interface IApiMongoValidationErrorResponse extends IApiMessageResponse {
  errors: IMongoErrors;
}
