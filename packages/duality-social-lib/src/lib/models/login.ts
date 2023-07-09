import { Schema, model } from "mongoose";
import { ILogin } from "../interfaces/login";
import { UserModelName } from "./user";

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