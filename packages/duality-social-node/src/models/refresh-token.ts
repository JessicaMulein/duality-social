import { model, Schema } from 'mongoose';
import { ClientModelName } from './client';
import { UserModelName } from './user';
import { IRefreshToken } from '@duality-social/duality-social-lib';

export const RefreshTokenModelName = 'RefreshToken';

export const RefreshTokenSchema = new Schema<IRefreshToken>({
    refreshToken: { type: String, required: true },
    refreshTokenExpiresAt: { type: Date, required: true },
    scope: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: ClientModelName, required: true },
    user: { type: Schema.Types.ObjectId, ref: UserModelName, required: true },
  });
  
  export const RefreshToken = model<IRefreshToken>(RefreshTokenModelName, RefreshTokenSchema);
  