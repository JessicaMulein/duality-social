import { IApiMessageResponse } from "./api-message-response.ts";

export interface ITokenResponse extends IApiMessageResponse {
    token: string;
}