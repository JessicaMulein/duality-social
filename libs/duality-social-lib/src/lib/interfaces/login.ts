import { Types } from "mongoose";

export interface ILogin {
    userId: Types.ObjectId;
    ip: string;
    userAgent: string;
    createdAt: Date;
}