import { IUser, ModelName, BaseModel } from '@duality-social/duality-social-lib';
import { Router } from 'express';

const UserModel = BaseModel.getModel<IUser>(ModelName.User);

export const userRouter = Router();

// Create a user with Email and Password
userRouter.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if email or username already exists
    const existingUser = await UserModel.findOne({ $or: [{ email: email }, { username: username }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
    // Create a new user with email, hashed password, and username
    const newUser = new UserModel({ email: email, username });
    await newUser.save();

    // Send the response without the password
    res.status(201).json({ message: 'User created successfully', user: { email: newUser.email, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});