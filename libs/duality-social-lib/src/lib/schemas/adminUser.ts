import { Schema } from 'mongoose';
import { IAdminUser } from '../interfaces/adminUser';

/**
 * An admin user in the system.
 */
export const AdminUserSchema = new Schema<IAdminUser>(
  {
    lastSudo: { type: Date, default: null },
    lastFailedSudo: { type: Date, default: null },
  },
  { timestamps: true }
);