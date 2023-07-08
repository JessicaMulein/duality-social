import express, { Request, Response } from 'express';
import path from 'path';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { Pool } from 'pg';
import { environment } from './environment';
import { sequelize } from './db/database';
import apiRouter from './api.router';
import User from './db/user';

// Sync the models with the database
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log('Connected to the database and synchronized the models');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

syncDatabase();

const pool = new Pool({
  user: environment.postgres.user,
  host: environment.postgres.host,
  database: environment.postgres.database,
  password: environment.postgres.password,
  port: environment.postgres.port,
});

const app = express();

app.use(
  session({
    store: new (pgSession(session))({
      pool,
      tableName: environment.session.table,
    }),
    secret: environment.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: environment.session.maxAge,
    },
  })
);

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
