import { model, Schema } from 'mongoose';
import { UserModelName } from './user';
import { ClientModelName } from './client';
import { IAccessToken } from '@duality-social/duality-social-lib';

export const AccessTokenModelName = 'AccessToken';

export const AccessTokenSchema = new Schema<IAccessToken>({
    accessToken: { type: String, unique: true, required: true },
    accessTokenExpiresAt: { type: Date, required: true },
    scope: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: ClientModelName, required: true },
    user: { type: Schema.Types.ObjectId, ref: UserModelName, required: true },
});

export const AccessToken = model<IAccessToken>(AccessTokenModelName, AccessTokenSchema);