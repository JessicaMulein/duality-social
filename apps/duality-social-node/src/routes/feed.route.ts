import { Router } from 'express';
import { newPost } from '../controllers/feed';

// all routes prefixed with /api/feed
export const feedRouter = Router();
// Sub-routers
// -----
// all routes prefixed with /api/openai

// Commands
// -----
// /api/test
feedRouter.post('/', newPost);

feedRouter.post('/preview', )