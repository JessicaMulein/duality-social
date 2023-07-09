import { Document, Schema } from 'mongoose';

export interface IRefreshToken extends Document {
    refreshToken: string;
    refreshTokenExpiresAt: Date;
    scope: string;
    client: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
}