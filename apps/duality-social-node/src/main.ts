/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
import express from 'express';
import https from 'https';
import fs from 'fs';
import { environment, environment as environmentToValidate } from './environments/environment';
import { IEnvironment, validateEnvironment } from './interfaces/environment';
import { setupPusher } from './setupPusher';
import { setupPassport } from './setupPassport';
import { setupDatabase } from './setupDatabase';
import { setupMiddlewares } from './setupMiddlewares';
import { setupSession } from './setupSession';
import { setupRoutes } from './setupRoutes';
import session from 'express-session';
import './types';

declare global {
  namespace Express {
    interface User { }
  }
}

async function configureApplication(validatedEnvironment: IEnvironment): Promise<void> {
  const app = express();
  await setupDatabase();
  await setupPusher(app);
  const sessionConfig = await setupSession(app);
  if (sessionConfig !== null) {
    if (environment.production) {
      // enable secure cookies in production
      sessionConfig.cookie = {...sessionConfig.cookie, ...{secure: true} };
    }
    app.use(session(sessionConfig));
  }
  await setupPassport(app);
  await setupMiddlewares(app);
  await setupRoutes(app);

  if (environment.production) {
    /**
     * In App Service, SSL termination happens at the network load balancers, so all HTTPS requests reach your app as unencrypted HTTP requests.
     * The line below is needed for getting the correct absolute URL for redirectUri configuration. For more information, visit:
     * https://docs.microsoft.com/azure/app-service/configure-language-nodejs?pivots=platform-linux#detect-https-session
     */
      app.set('trust proxy', 1) // trust first proxy e.g. App Service
  }

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
