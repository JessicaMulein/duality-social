import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

export const UserModelName = 'User';

export const UserSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  });

export const User = model<IUser>(UserModelName, UserSchema);