/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
import express from 'express';
import compression from 'compression';
import { apiRouter as apiRouter } from './routes/api.route';
import { authRouter as authRouter } from './routes/auth.route';
import { usersRouter as usersRouter } from './routes/users.route';
import { cors as corslib } from './cors';
import https from 'https';
import fs from 'fs';
import { environment as environmentToValidate } from './environments/environment';
import { IEnvironment, validateEnvironment } from './interfaces/environment';
import { AccountInfo, PkceCodes } from '@azure/msal-common';
import {
  AuthorizationCodeRequest,
  AuthorizationUrlRequest,
} from '@azure/msal-node';
import { setupPusher } from './setupPusher';
import { setupPassport } from './setupPassport';
import { setupDatabase } from './setupDatabase';
import { setupMiddlewares } from './setupMiddlewares';
import { setupSession } from './setupSession';

// Augment express-session with a custom SessionData object
declare module 'express-session' {
  interface SessionData {
    pkceCodes?: PkceCodes;
    authCodeUrlRequest?: AuthorizationUrlRequest;
    authCodeRequest?: AuthorizationCodeRequest;
    accessToken?: string;
    account?: AccountInfo | null;
    csrfToken?: string;
    idToken?: string;
    isAuthenticated?: boolean;
  }
}

declare global {
  namespace Express {
    interface User { }
  }
}

async function configureApplication(validatedEnvironment: IEnvironment): Promise<void> {
  await setupDatabase();
  const app = express();
  await setupPusher(app);
  await setupSession(app);
  await setupPassport(app);
  await setupMiddlewares(app);

  if (validatedEnvironment.developer.sslEnabled) {
    const path =
      (process.env.NX_WORKSPACE_ROOT ?? '.') +
      '/apps/duality-social-node/localdev/';
    const httpsOptions = {
      key: fs.readFileSync(path + 'cert.key'),
      cert: fs.readFileSync(path + 'cert.pem'),
    };
    https
      .createServer(httpsOptions, app)
      .listen(validatedEnvironment.developer.port, () => {
        console.log(
          `[ ready ] https://${validatedEnvironment.developer.host}:${validatedEnvironment.developer.port}`
        );
      });
  } else {
    app.listen(
      validatedEnvironment.developer.port,
      validatedEnvironment.developer.host,
      () => {
        console.log(
          `[ ready ] http://${validatedEnvironment.developer.host}:${validatedEnvironment.developer.port}`
        );
      }
    );
  }
}

validateEnvironment(environmentToValidate, async (validatedEnvironment: IEnvironment) => {
  return await configureApplication(validatedEnvironment);
});
