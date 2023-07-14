import { LockStatus } from '../enumerations/lock-status';

export interface IUserResponse {
    email: string;
    lockStatus: LockStatus;
    username: string;
    tz?: string;
    createdAt: Date;
    updatedAt: Date;
}