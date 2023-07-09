import { Schema } from "mongoose";
import { LoginFailureReason } from "../enumerations/login-failure-reason";

export interface ILogin {
    user: Schema.Types.ObjectId;
    agent?: string;
    failureReason?: LoginFailureReason;
    ip: string;
    success: boolean;
    createdAt: Date;
}