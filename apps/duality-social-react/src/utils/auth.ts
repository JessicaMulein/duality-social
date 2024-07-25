import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    // Add any additional verification logic if needed
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserDetails = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
};