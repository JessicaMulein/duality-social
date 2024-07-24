import { Router } from 'express';
import FeedController from '../controllers/api/feed';
import UserController from '../controllers/api/user';

// all routes prefixed with /api and all are authenticated
export const apiRouter = Router();

const feedController = new FeedController();
const userController = new UserController();

// Sub-routers
// -----
// all routes prefixed with /api/openai
// apiRouter.use('/openai', openAiRouter);
apiRouter.use('/feed', feedController.router);
apiRouter.use('/user', userController.router);

// Commands
// -----
// /api/test