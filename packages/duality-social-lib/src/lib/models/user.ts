import { genSalt, hash } from 'bcrypt';
import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

export const UserModelName = 'User';

export const UserSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, unique: true, required: true },
  lastLogin: { type: Date, required: false },
  lastFailedLogin: { type: Date, required: false },
  lockExpiration: { type: Date, required: false },
  lockStatus: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  tz: { type: String, required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});


UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  }
  next();
});

export const User = model<IUser>(UserModelName, UserSchema);