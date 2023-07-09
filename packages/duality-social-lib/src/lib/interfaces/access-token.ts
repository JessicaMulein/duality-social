import { Document } from 'mongoose';
import { IClient } from './client';
import { IUser } from './user';

export interface IAccessToken extends Document {
    accessToken: string;
    accessTokenExpiresAt: Date;
    scope: string;
    client: IClient;
    user: IUser;
  }