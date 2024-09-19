import { IApiMessageResponse } from "./api-message-response.ts";

export interface IApiErrorResponse extends IApiMessageResponse {
    error: unknown;
}