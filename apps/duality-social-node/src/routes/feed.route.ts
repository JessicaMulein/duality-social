import { Router } from 'express';
import { newPost, previewPost } from '../controllers/feed';

// all routes prefixed with /api/feed
export const feedRouter = Router();
// Sub-routers
// -----

// Commands
// -----
feedRouter.post('/', newPost);

feedRouter.post('/preview', previewPost)