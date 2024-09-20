import { ValidationError } from 'express-validator';
import { IApiMessageResponse } from './api-message-response.ts';

export interface IApiExpressValidationErrorResponse extends IApiMessageResponse {
    errors: ValidationError[];
}