import { ILoginDocument, ModelName } from '@duality-social/duality-social-lib';
import { Schema } from 'mongoose';

/**
 * Represents a user logging in.
 */
export const LoginSchema = new Schema<ILoginDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      null: false,
      immutable: true,
    },
    ip: { type: String, required: true, null: false, immutable: true },
    userAgent: { type: String, required: true, null: false, immutable: true },
  },
  { timestamps: true },
);
