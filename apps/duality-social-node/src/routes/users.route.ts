import { Request, Response, Router} from 'express';
import { UserService } from '../services/userService';
export const usersRouter = Router();

usersRouter.post('/register', async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const newUser = await UserService.register(email, username, password);
    res.status(201).json(newUser);
  }
  catch (error) {
    res.status(400).json(error);
  }
});