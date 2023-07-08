import express, { Router, Request, Response } from 'express';
const apiRouter: Router = express.Router();
// Example route
apiRouter.get('/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the API' });
});

// Another route
apiRouter.post('/feed', (req: Request, res: Response) => {
    const contents = req.body;
    // Process the data and send a response
    res.json({ message: 'Data received', data: contents });
});

export default apiRouter;