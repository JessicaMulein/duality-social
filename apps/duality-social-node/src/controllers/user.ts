import { IUser, PasswordRounds, UserModel, UserMetaModel } from '@duality-social/duality-social-lib';
import { Router } from 'express';
import passport from 'passport';
import { hashSync } from 'bcryptjs';
import { createUser } from '../services/userService';
import { getUserFromDatabase } from '../services/userService';

export const userRouter = Router();

// Login with Email and Password
userRouter.post('/login/local', passport.authenticate('local', { session: false }), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

// Login with MSAL Token, TODO: actually use auth
userRouter.post('/login/msal-auth', passport.authenticate('oauth-bearer', { session: false }), (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
});

userRouter.post('/login/msal', async (req, res) => {
  // for now, accept a post from the client with the token and the user details in the body
  // eventually we'll only take the token and get the user details from the token
  const token = req.body.token;
  const user = req.body.user;
  if (token === undefined || user === undefined) {
    res.status(400).json({ message: 'Invalid request' });
    return;
  }
  // TODO: validate the token and user details
  console.log('writeUser', token, user);
  const existingUser = await getUserFromDatabase(user._id);
  if (existingUser !== null) {
    res.status(200).json({ message: 'User already exists', user: existingUser });
    return;
  }
  // get an instance of the user model
  const userModel = await createUser(user);
  // send the response
  res.status(200).json({ message: 'User created successfully', user: userModel });
});

// Create a user with Email and Password
userRouter.post('/register/local', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if email or username already exists
    const existingUser = await UserModel.findOne({ $or: [{ accountEmail: email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    const hashedPassword = hashSync(password, PasswordRounds);
    // Create a new user with email, hashed password, and username
    const newUser = new UserModel({ accountEmail: email, accountPasswordHash: hashedPassword, username });
    await newUser.save();

    const newUserMeta = new UserMetaModel({
      _id: newUser._id,
    });
    await newUserMeta.save();

    // Send the response without the password
    res.status(201).json({ message: 'User created successfully', user: { email: newUser.accountEmail, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Create a user with MSAL Token
userRouter.post('/register/msal', passport.authenticate('oauth-bearer', { session: false }), async (req, res) => {
  const { username } = req.body;
  const email = (req.user as IUser).accountEmail;

  try {
    // Check if email or username already exists
    const existingUser = await UserModel.findOne({ $or: [{ accountEmail: email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    // Create a new user with email and username
    // You may want to store the token as well for future use, but be cautious of potential security implications
    const newUser = new UserModel({ accountEmail: email, username });
    
    // Since we don't have a password for the user, we can remove the password field
    newUser.accountPasswordHash = undefined;
    await newUser.save();

    const newUserMeta = new UserMetaModel({
      _id: newUser._id,
    });
    await newUserMeta.save();

    // Send the response without the password field
    res.status(201).json({ message: 'User created successfully', user: { email: newUser.accountEmail, username: newUser.username } });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: 'Validation error', error: error.errors });
    } else {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }
});
