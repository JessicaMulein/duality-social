import { randomBytes } from 'crypto';
import { Schema } from 'mongoose';
import validator from 'validator';
import ModelName from '../enumerations/modelName';
import { IInvitation } from '../interfaces/invitation';

const generateRandomCode = () => {
  return randomBytes(32).toString('hex');
}


export const InvitationSchema = new Schema<IInvitation>(
  {
    email: {
      type: String,
      required: false,
      optional: true,
      immutable: true,
      validate: {
        validator: async function (value: string) {
          if (!validator.isEmail(value)) {
            return false;
          }
          return true;
        },
      },
    },
    phone: { type: String, required: false, optional: true, immutable: true, validate: {
        validator: async function (value: string) {
          if (!validator.isMobilePhone(value)) {
            return false;
          }
          return true;
        }
    } },
    code: { type: String, default: generateRandomCode, required: true, immutable: true },
    maxUses: { type: Number, required: true, immutable: true },
    metadata: {
      uses: { type: Number, required: true },
      views: { type: Number, required: true },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
      immutable: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: ModelName.User,
      required: true,
    },
  },
  { timestamps: true }
);
