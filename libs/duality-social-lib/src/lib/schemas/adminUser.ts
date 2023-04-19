import { Schema } from 'mongoose';

/**
 * An admin user in the system.
 */
export const AdminUserSchema = new Schema(
  {
    /**
     * The user id of the admin
     */
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
    },
    /**
     * The password hash for sudo access.
     */
    sudoHash: { type: String, required: true },
    lastSudo: {
      type: Date,
      default: null,
    },
    lastFailedSudo: { type: Date, default: null },
  },
  { timestamps: true }
);