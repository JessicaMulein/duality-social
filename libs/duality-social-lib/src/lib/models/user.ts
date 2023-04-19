// models/userModel.ts
import { model } from 'mongoose';
import { IUser } from '../interfaces/user';
import { UserSchema } from '../schemas/user';

export const UserModel = model<IUser>('User', UserSchema);
