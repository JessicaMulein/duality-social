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

export const createUser = async (token: any): Promise<IUser> => {
  try {
    const user = await UserModel.create({
      id: token.sub,
      displayName: token.name,
      email: token.email,
      roles: ['User'],
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}