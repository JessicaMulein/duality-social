import { Schema } from 'mongoose';
import { ISudoLog } from '../interfaces/sudoLog';
import ModelName from '../enumerations/modelName';

export const SudoLogSchema = new Schema<ISudoLog>({
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
  adminUserId: { type: Schema.Types.ObjectId, ref: ModelName.AdminUser, optional: true, immutable: true },
  /**
   * Whether the sudo attempt was successful.
   */
  success: { type: Boolean, required: true, immutable: true, null: false },
}, { timestamps: true });
