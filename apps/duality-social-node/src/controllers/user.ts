import { PasswordRounds, UserModel, UserMetaModel } from '@duality-social/duality-social-lib';
import { Router } from 'express';
import { hashSync } from 'bcryptjs';

export const userRouter = Router();

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
      userId: newUser._id,
    });
    await newUserMeta.save();

    // Send the response without the password
    res.status(201).json({ message: 'User created successfully', user: { email: newUser.accountEmail, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});