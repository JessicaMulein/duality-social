import { Document } from 'mongoose';

export interface IClient extends Document {
    clientId: string;
    clientSecret: string;
    redirectUris: string[];
    grants: string[];
}