// utils/userUtils.ts
import axios from 'axios';
import { IUser, UserModel } from '@duality-social/duality-social-lib';
import { environment } from '../environments/environment';

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
      accountEmail: token.email,
      roles: ['User'],
    });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUserFromDatabaseByToken(accessToken: string): Promise<IUser | null> {
  try {
    // Retrieve the user from the database based on the access token
    // You would typically query your database here and return the user object
    // based on the information extracted from the access token.

    // Example:
    const user = await UserModel.findOne({ accessToken });

    return user || null;
  } catch (error) {
    console.error('Error retrieving user from the database:', error);
    throw error;
  }
}