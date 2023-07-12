import express, { Router, Request, Response } from 'express';

const apiRouter: Router = express.Router();
// Example route
apiRouter.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the API' });
});

apiRouter.get('/feed', async (req: Request, res: Response) => {
    // use our mongoose to get all of the posts
    try {
        // Retrieve all posts from the database

        // Send the posts as the API response
        res.json([]);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});

apiRouter.post('/feed', async (req: Request, res: Response) => {
    try {
        const contents = req.body;

        // Send a response with the saved post
        res.status(201).json({});
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Failed to process data' });
    }
});

export default apiRouter;