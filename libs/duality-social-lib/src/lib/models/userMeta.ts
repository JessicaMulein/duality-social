// models/userModel.ts
import { model } from 'mongoose';
import { IUserMeta } from '../interfaces/userMeta';
import { UserMetaSchema } from '../schemas/userMeta';

export const UserMetaModel = model<IUserMeta>('UserMeta', UserMetaSchema);