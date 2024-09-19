import { IApiMessageResponse } from "./api-message-response.ts";
import { IRequestUser } from "../request-user.ts";

export interface IUserResponse extends IApiMessageResponse {
    user: IRequestUser;
}