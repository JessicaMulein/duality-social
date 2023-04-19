import { Request, Response, NextFunction } from 'express';
import { ITokenPayload } from './models/tokenPayload.interface';

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}

export function validateRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as ITokenPayload;
    if (user.roles && user.roles.includes(role)) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden' });
  };
}


export function ensureAdmin(req: Request, res: Response, next: NextFunction): void {
    const user = req.user as ITokenPayload;
    if (req.isAuthenticated() && user['roles']?.includes('Admin')) {
      return next();
    }
    res.status(403).json({ message: 'Forbidden' });
  };
  