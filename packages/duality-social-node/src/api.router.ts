import express, { Router, Request, Response } from 'express';
import Post from './db/post';

const apiRouter: Router = express.Router();
// Example route
apiRouter.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the API' });
});

apiRouter.get('/feed', async (req: Request, res: Response) => {
    // use our sequelize to get all of the posts
    try {
        // Retrieve all posts from the database
        const posts = await Post.findAll();

        // Send the posts as the API response
        res.json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});

apiRouter.post('/feed', async (req: Request, res: Response) => {
    try {
        const contents = req.body;
        const post = await Post.create(contents);

        // Send a response with the saved post
        res.status(201).json(post);
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Failed to process data' });
    }
});

export default apiRouter;