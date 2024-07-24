import { Request, Response, Router } from 'express';
import { UserService } from '../../services/user';

class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', this.register);
    this.router.post('/login', this.login);
  }

  private async register(req: Request, res: Response) {
    const { email, username, password } = req.body;
    try {
      await UserService.register(email, username, password);
      res.status(201).json({
        message: 'User created successfully',
        email: email,
        username: username,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }

  private async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await UserService.login(email, password);
      res.status(200).json({
        message: 'User logged in successfully',
        user,
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials', error });
    }
  }
}

export default UserController;