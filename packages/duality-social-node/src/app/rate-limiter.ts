import express from 'express';
import rateLimit from 'express-rate-limit';

import { environment } from '../environment';

export function addRateLimiter(app: express.Application) {
    const limiter = rateLimit({
        windowMs: environment.rateLimiter.windowMs,
        max: environment.rateLimiter.max, // limit each IP to N requests per windowMs
        message: "Too many requests from this IP, please try again later"
      });
      
      app.use(limiter);
}