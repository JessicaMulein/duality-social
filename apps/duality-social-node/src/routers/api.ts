import { UserController } from '../controllers/api/user.ts';
import { FeedController } from '../controllers/api/feed.ts';
import { BaseRouter } from './base.ts';

/**
 * Router for the API
 */
export class ApiRouter extends BaseRouter {
    private static readonly userController: UserController = new UserController();
    private static readonly feedController: FeedController = new FeedController();
    constructor() {
        super();
        this.router.use('/user', ApiRouter.userController.router);
        this.router.use('/feed', ApiRouter.feedController.router);
    }
}