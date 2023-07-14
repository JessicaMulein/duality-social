import { Schema, model } from 'mongoose';
import { UserModelName } from './user';
import { IEmailVerification } from '@duality-social/duality-social-lib';

export const EmailVerificationModelName = 'EmailVerification';

export const EmailVerificationSchema = new Schema<IEmailVerification>({
    user: { type: Schema.Types.ObjectId, ref: UserModelName, required: true },
    email: { type: String, unique: true, required: true },
    token: { type: String, unique: true, required: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
});

export const EmailVerification = model<IEmailVerification>(EmailVerificationModelName, EmailVerificationSchema);