import { Router } from 'express';
import { testGet } from '../controllers/test';
import { openAiRouter  } from '../routes/openai.route';
import { feedRouter } from './feed.route';

// all routes prefixed with /api and all are authenticated
export const apiRouter = Router();
// Sub-routers
// -----
// all routes prefixed with /api/openai
apiRouter.use('/openai', openAiRouter);
// all routes prefixed with /api/feed
apiRouter.use('/feed', feedRouter);

// Commands
// -----
// /api/test
apiRouter.get('/test', testGet);