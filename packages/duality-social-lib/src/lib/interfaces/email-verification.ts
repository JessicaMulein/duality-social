import { Schema } from "mongoose";

export interface IEmailVerification {
    user: Schema.Types.ObjectId;
    email: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;
}