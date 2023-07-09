import { Document, Schema } from 'mongoose';

export interface IAuthorizationCode extends Document {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope: string;
  client: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}