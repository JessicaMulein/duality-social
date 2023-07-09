import express, { Request, Response } from 'express';
import path from 'path';
import session, { SessionOptions } from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { environment } from './environment';
import { SessionData } from './interfaces/session.data';
import apiRouter from './api.router';

declare module 'express-session' {
  interface SessionData {
    views?: number;
    // Add other properties as needed
  }
}

mongoose
  .connect(environment.session.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});

app.use(limiter);

app.use(express.static(path.join(environment.rootPath, 'dist/packages/duality-social-react')));

app.use('/api', apiRouter);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(environment.rootPath, 'dist/packages/duality-social-react/index.html'));
});

app.listen(environment.port, environment.host, () => {
  console.log(`[ ready ] http://${environment.host}:${environment.port}`);
});
