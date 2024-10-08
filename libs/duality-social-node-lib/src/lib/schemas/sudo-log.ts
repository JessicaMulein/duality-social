import {
  ISudoLogDocument,
  ModelName,
} from '@duality-social/duality-social-lib';
import { Schema } from 'mongoose';

export const SudoLogSchema = new Schema<ISudoLogDocument>(
  {
    /**
     * The id of the user attempting sudo.
     */
    userId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      immutable: true,
    },
    /**
     * The id of the admin user if the sudo attempt was successful.
     */
    adminUserId: {
      type: Schema.Types.ObjectId,
      ref: ModelName.AdminUser,
      optional: true,
      immutable: true,
    },
    /**
     * Whether the sudo attempt was successful.
     */
    success: { type: Boolean, required: true, immutable: true, null: false },
  },
  { timestamps: true },
);
