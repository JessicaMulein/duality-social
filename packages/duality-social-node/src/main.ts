import express, { Request, Response } from 'express';

import { environment } from './environment';

import { addBodyParser } from './app/body-parser';
import { addMongoose } from './app/mongoose';
import { addMongoSession } from './app/mongo.session';
import { addRateLimiter } from './app/rate-limiter';
import { addRoutesAndServeStatic } from './app/routes';

const app = express();

addMongoose((connection: any) => {
  addBodyParser(app);
  addMongoSession(app);
  addRateLimiter(app);
  addRoutesAndServeStatic(app);

  app.listen(environment.port, environment.host, () => {
    console.log(`[ ready ] http://${environment.host}:${environment.port}`);
  });
});