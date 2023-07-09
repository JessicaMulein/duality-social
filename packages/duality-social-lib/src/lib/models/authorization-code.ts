import { model, Schema } from 'mongoose';
import { IAuthorizationCode } from '../interfaces/authorization-code';
import { ClientModelName } from './client';
import { UserModelName } from './user';

export const AuthorizationCodeModelName = 'AuthorizationCode';

export const AuthorizationCodeSchema = new Schema<IAuthorizationCode>({
    authorizationCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    redirectUri: { type: String, required: true },
    scope: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: ClientModelName, required: true },
    user: { type: Schema.Types.ObjectId, ref: UserModelName, required: true },
  });
  
  export const AuthorizationCode = model<IAuthorizationCode>(AuthorizationCodeModelName, AuthorizationCodeSchema);
  