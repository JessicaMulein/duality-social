import { Schema, model } from 'mongoose';
import { IEmailVerification } from '../interfaces/email-verification'
import { UserModelName } from './user';

export const EmailVerificationModelName = 'EmailVerification';

export const EmailVerificationSchema = new Schema<IEmailVerification>({
    user: { type: Schema.Types.ObjectId, ref: UserModelName, required: true },
    email: { type: String, unique: true, required: true },
    token: { type: String, unique: true, required: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
});

export const EmailVerification = model<IEmailVerification>(EmailVerificationModelName, EmailVerificationSchema);