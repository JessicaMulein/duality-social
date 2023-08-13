import { Router } from 'express';
import { testGet } from '../controllers/test';

// all routes prefixed with /api and all are authenticated
export const adminRouter = Router();
adminRouter.get('/test', testGet);