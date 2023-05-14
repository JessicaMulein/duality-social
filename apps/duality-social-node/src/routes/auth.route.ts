import express from 'express';
import { Request, Response } from 'express';
import { Credentials, App, User } from 'realm-web';
import { environment } from '../environments/environment';
import { sign } from 'jsonwebtoken'

export const authRouter = express.Router();

const app = new App({ id: environment.realm.appId });

authRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const sanitizedEmail = email.toLowerCase().trim();
  try {
    await app.emailPasswordAuth.registerUser({
      email: sanitizedEmail,
      password
    });
  }
  catch (error) {
    res.status(500).send(error);
  }
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const sanitizedEmail = email.toLowerCase().trim();
  const credentials = Credentials.emailPassword(sanitizedEmail, password);
  try {
    const user = await app.logIn(credentials);
    const token = sign({ email: sanitizedEmail }, environment.realm.customJwtSecret, { expiresIn: '1h' });
    res.send({ token, user });
  }
  catch (error) {
    res.status(401).send('Invalid credentials!');
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
