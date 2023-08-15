import { Request, Response, Router} from 'express';
import { UserService } from '../services/userService';
export const usersRouter = Router();

usersRouter.post('/register', async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    await UserService.register(email, username, password);
    res.status(201).json({
      message: 'User created successfully',
      email: email,
      username: username,
    });
  }
  catch (error) {
    res.status(400).json(error);
  }
});