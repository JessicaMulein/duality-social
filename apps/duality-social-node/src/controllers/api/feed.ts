import { Request, Response, Router } from 'express';
import { FeedService } from '../../services/feed';

export class FeedController {
    public router: Router;
    private feedService: FeedService;

    constructor() {
        this.router = Router();
        this.feedService = new FeedService();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.newPost.bind(this));
        this.router.post('/preview', this.newReply.bind(this));
    }

    async getFeed(req: Request, res: Response) {
        try {
            const feed = await this.feedService.getFeed(req, res);
            res.status(200).json(feed);
        } catch (error) {
            console.error('Error fetching feed:', error);
            res.status(500).send('An error occurred while fetching the feed');
        }
    }

    async newPost(req: Request, res: Response) {
        try {
            const post = await this.feedService.newPost(req, res);
            res.status(200).json(post);
        } catch (error) {
            console.error('Error creating new post:', error);
            res.status(500).send('An error occurred while creating the post');
        }
    }

    async newReply(req: Request, res: Response) {
        try {
            const reply = await this.feedService.newReply(req, res);
            res.status(201).json(reply);
        } catch (error) {
            console.error('Error creating new reply:', error);
            res.status(500).send('An error occurred while creating the reply');
        }
    }
}

export default FeedController;