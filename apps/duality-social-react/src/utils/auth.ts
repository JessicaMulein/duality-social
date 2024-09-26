import { ITokenUser } from '@duality-social/duality-social-lib';
import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserDetails = (token: string): ITokenUser | null => {
  try {
    const decoded = jwtDecode<ITokenUser>(token);
    return decoded;
  } catch (error) {
    return null;
  }
};

export const verifyToken = (token: string) => {
  const userDetails = getUserDetails(token);
  if (userDetails) {
    return true;
  }
};
