import { Schema } from 'mongoose';
import { IAdminUser } from '../interfaces/adminUser';
import ModelName from '../enumerations/modelName';

/**
 * An admin user in the system.
 */
export const AdminUserSchema = new Schema<IAdminUser>(
  {
    userId: { type: Schema.Types.ObjectId, ref: ModelName.User, required: true, immutable: true },
    /**
     * The password hash for sudo access.
     */
    sudoHash: { type: String, required: true },
    sudoHashSalt: { type: String, required: true },
    lastSudo: {
      type: Date,
      default: null,
    },
    lastFailedSudo: { type: Date, default: null },
  },
  { timestamps: true }
);