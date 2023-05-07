/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-interface */
import express from 'express';
import https from 'https';
import fs from 'fs';
import {
  environment,
  environment as environmentToValidate,
} from './environments/environment';
import { IEnvironment, validateEnvironment } from './interfaces/environment';
import { setupPusher } from './setupPusher';
import { setupDatabase } from './setupDatabase';
import { setupMiddlewares } from './setupMiddlewares';
import { setupSession } from './setupSession';
import { setupRoutes } from './setupRoutes';
import session from 'express-session';
import { ApolloServer, gql } from 'apollo-server-express';
import './types';
import { allGraphQlModels } from 'libs/duality-social-lib/src/lib/db_functions';

declare global {
  namespace Express {
    interface User { }
  }
}

// go through the models we have in and use the ModelDatas we have to create a full schema of graphql objects in gql
function allGraphQlModelsToGql(): string {
  let result = '';
  allGraphQlModels().forEach((value) => {
    result += gql`
      ${value}
    `;
  });
  return result;
}

async function configureApplication(
  validatedEnvironment: IEnvironment
): Promise<void> {
  const app = express();
  await setupDatabase();
  await setupPusher(app);
  const sessionConfig = await setupSession(app);
  if (sessionConfig !== null) {
    if (environment.production) {
      // enable secure cookies in production
      sessionConfig.cookie = { ...sessionConfig.cookie, ...{ secure: true } };
    }
    app.use(session(sessionConfig));
  }
  await setupMiddlewares(app);
  await setupRoutes(app);

  if (environment.production) {
    /**
     * In App Service, SSL termination happens at the network load balancers, so all HTTPS requests reach your app as unencrypted HTTP requests.
     * The line below is needed for getting the correct absolute URL for redirectUri configuration. For more information, visit:
     * https://docs.microsoft.com/azure/app-service/configure-language-nodejs?pivots=platform-linux#detect-https-session
     */
    app.set('trust proxy', 1); // trust first proxy e.g. App Service
  }

  const typeDefs = allGraphQlModelsToGql();
  const resolvers = {
    Query: {
      currentUser: async (_: any, __: any, context: any) => {
        // Fetch user data from MongoDB using context.user
        console.log(context.user);
        throw new Error('not implemented');
      },
    },
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const user = req.user;

      return {
        user,
      };
    },
  });

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

validateEnvironment(
  environmentToValidate,
  async (validatedEnvironment: IEnvironment) => {
    return await configureApplication(validatedEnvironment);
  }
);
