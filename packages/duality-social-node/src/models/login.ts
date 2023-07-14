import { Schema, model } from "mongoose";
import { UserModelName } from "./user";
import { ILogin } from '@duality-social/duality-social-lib';

export const LoginModelName = 'Login';

export const LoginSchema = new Schema<ILogin>({
    user: { type: Schema.Types.ObjectId, ref: UserModelName, required: true },
    agent: { type: String, required: false },
    failureReason: { type: String, required: false },
    ip: { type: String, required: true },
    success: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
});

export const Login = model<ILogin>(LoginModelName, LoginSchema);