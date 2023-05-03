import { Request, Response, NextFunction } from 'express';
import { ITokenPayload } from './models/tokenPayload.interface';
import passport from 'passport';
import { environment } from './environments/environment';


export function requireAuthForRestrictedRoutes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const publicRoutes = ['/'];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  // Continue with the ensureAuthenticated middleware for other routes
  ensureAuthenticated(req, res, next);
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('Checking authentication...');
  passport.authenticate('oauth-bearer', { session: environment.cookies.enabled }, (err: any, user: Express.User | undefined, info: any) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (!user) {
      console.log('Not authenticated!');
      // Modify this response based on how you want to handle unauthenticated requests.
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach the user object to the request so that it can be used in other middlewares or route handlers.
    req.user = user;

    // Proceed to the next middleware or route handler.
    return next();
  })(req, res, next);
}

// export function ensureAuthenticated(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   console.log('Checking authentication...');
//   if (req.isAuthenticated()) {
//     console.log('Authenticated!');
//     return next();
//   }
//   console.log('Not authenticated!');

//   res.status(401).json({ message: 'Unauthorized' });
// }

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
  console.log('Checking admin...');
  const user = req.user as ITokenPayload;
  if (req.isAuthenticated() && user['roles']?.includes('Admin')) {
    return next();
  }
  res.status(403).json({ message: 'Forbidden' });
};
