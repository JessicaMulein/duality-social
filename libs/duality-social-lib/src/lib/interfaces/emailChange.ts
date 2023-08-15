import { IHasID } from './hasId';
import { IHasTimestamps } from './hasTimestamps';
import { IUser } from './user';

export interface IEmailChange extends IHasID, IHasTimestamps {
    userId: IUser['_id'];
    email: string;
    token: string;
    createdAt: Date;
}