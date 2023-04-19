// utils/userUtils.ts
import { IUser, UserModel } from '@duality-social/duality-social-lib';

export const getUserFromDatabase = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    console.error('Error fetching user from database:', error);
    return null;
  }
};
