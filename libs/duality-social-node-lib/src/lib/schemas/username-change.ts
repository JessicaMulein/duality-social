import {
  IUsernameChangeDocument,
  ModelName,
} from '@duality-social/duality-social-lib';
import { Schema } from 'mongoose';

export const UsernameChangeSchema = new Schema<IUsernameChangeDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: ModelName.User,
    required: true,
    null: false,
    immutable: true,
  },
  /**
   * The old name of the user.
   */
  oldName: { type: String, required: true, null: false, immutable: true },
  /**
   * The new name of the user.
   */
  newName: { type: String, required: true, null: false, immutable: true },
  /**
   * The date the name was changed.
   */
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
  /**
   * The id of the user changing their name.
   */
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    null: false,
    immutable: true,
  },
});
