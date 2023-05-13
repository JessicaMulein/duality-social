import express from 'express';
import { Request, Response } from 'express';
import { Credentials, App, User } from 'realm-web';
import { environment } from '../environments/environment';

export const authRouter = express.Router();

const app = new App({ id:environment.realm.appId });

authRouter.post('/login', async (req: Request, res: Response) => {
  const user = req.body.user as User;
  console.log('user', user);
  console.log(user.identities[0]);
  console.log(user.profile);
  // are we authenticated?
  if (req.session.isAuthenticated) {
    console.log('already authenticated');
  } else {
    console.log('not authenticated');
  }
});
authRouter.get('/signin', async (req: Request, res: Response) => {
  try {
    const credentials = Credentials.anonymous();
    const user = await app.logIn(credentials);

    // Save the user to the session
    req.session.realmUser = user;
    req.session.isAuthenticated = true;
    req.session.save();

    res.redirect('/');
  } catch (error) {
    res.status(500).send('Failed to log in: ' + error);
  }
});

authRouter.get('/signout', async (req: Request, res: Response) => {
  try {
    const user = req.session.realmUser;
    if (user) {
      await user.logOut();
    }
    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    res.status(500).send('Failed to log out: ' + error);
  }
});

// Custom middleware to check auth state
export function isAuthenticated(req: Request, res: Response, next: (error?: unknown) => void) {
  if (!req.session.isAuthenticated) {
    return res.redirect('/auth/signin'); // Redirect to sign-in route
  }
  next();
}
