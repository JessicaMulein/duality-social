import { randomBytes } from 'crypto';
import { Schema } from 'mongoose';
import validator from 'validator';
import { ModelName } from '../enumerations/modelName';
import { IEmailChange } from '../interfaces/emailChange';

const generateRandomToken = () => {
    return randomBytes(32).toString('hex');
  }

/**
 * Represents a user changing their email address.
 */
export const EmailChangeSchema = new Schema<IEmailChange>({
    userId: { type: Schema.Types.ObjectId, ref: ModelName.EmailChange, required: true, null: false, immutable: true },
    email: { type: String, required: true, null: false, immutable: true, validate: {
        validator: async function (value: string) {
            if (!validator.isEmail(value)) {
                return false;
              }
              return true;
            }
        } 
    },
    token: { type: String, default: generateRandomToken, required: true, null: false, immutable: true },
}, { timestamps: true });