import { ObjectId } from 'mongoose';
import { IHasTimestamps } from './hasTimestamps';

export interface IEmailChange extends IHasTimestamps {
    userId: ObjectId;
    email: string;
    token: string;
    createdAt: Date;
}