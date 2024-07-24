import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
  
    if (!token) {
      return next(); // Skip authentication if no token is provided
    }
  
    try {
      const decoded = UserService.verifyToken(token);
      const user = await UserService.findById(decoded._id);
      if (!user) {
        throw new Error('User not found');
      }
      req.user = user;
      next();
    } catch (ex) {
      res.status(400).json({ message: 'Invalid token.' });
    }
};