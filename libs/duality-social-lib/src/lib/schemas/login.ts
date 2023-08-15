import { Schema } from 'mongoose';
import { ILogin } from '../interfaces/login';
import ModelName from '../enumerations/modelName';

/**
 * Represents a user logging in.
 */
export const LoginSchema = new Schema<ILogin>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: ModelName.User,
    required: true,
    null: false,
    immutable: true,
  },
  ip: { type: String, required: true, null: false, immutable: true },
  userAgent: { type: String, required: true, null: false, immutable: true },
}, { timestamps: true });
