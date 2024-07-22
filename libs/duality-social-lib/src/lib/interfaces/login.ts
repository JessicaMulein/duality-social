import { Schema } from "mongoose";

export interface ILogin {
    userId: Schema.Types.ObjectId;
    ip: string;
    userAgent: string;
    createdAt: Date;
}