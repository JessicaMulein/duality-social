import { dirname } from "path";
import { IEnvironment } from "../interfaces/environment";
import { readFileSync } from "fs";

/**
 * 6226576d-37e9-49eb-b201-ec1eeb0029b6 is the production microsoft client id
 * The other client id possibility is found under the Web App > Authentication under "App (client) ID"
 */
const clientId =
  process.env.CLIENT_ID ?? '25989269-b717-4761-8498-f83e3bfc0754';
/**
 * // https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-client-application-configuration
 */
const cloudInstance =
  process.env.CLOUD_INSTANCE ?? 'https://login.microsoftonline.com/';
const cloudInstanceDomain = cloudInstance.replace('https://', '').replace('/', '');
/**
 * https://learn.microsoft.com/en-us/azure/active-directory/develop/accounts-overview
 */
const tenantId =
  process.env.TENANT_ID ?? '87e87c07-f72e-4811-9730-85294c4c92e4';
  // consumers, common, organizations, or tenant id
  const authority = process.env.MSAL_AUTHORITY ?? cloudInstanceDomain;
  console.log('authority', authority);
//const authority = cloudInstance + tenantId + '/';
const host = process.env.SERVER_HOST ?? 'localhost';
const port = Number(process.env.PORT ?? 3000);
const production = process.env.NODE_ENV === 'production';
const sslEnabled = false; // process.env.SSL_ENABLED === 'true';
const urlProto = sslEnabled ? 'https://' : 'http://';
const serverHost = sslEnabled
  ? `${urlProto}${host}:${port === 443 ? '' : port}/`
  : `${urlProto}${host}:${port === 80 ? '' : port}/`;
const redirectUri = serverHost;

export const environment: IEnvironment = {
  production: production,
  developer: {
    angularDir: dirname(dirname(__filename)) +  '/duality-social-angular/',
    host: host,
    port: port,
    baseUrl: serverHost,
    sslEnabled: sslEnabled,
  },
  openai: {
    type: process.env.OPENAI_PROVIDER === 'azure' ? 'azure' : 'openai',
    accessToken: process.env.OPENAI_API_KEY ?? '',
    organization: process.env.OPENAI_ORGANIZATION
      ? process.env.OPENAI_ORGANIZATION
      : undefined,
    model: process.env.OPENAI_MODEL
      ? process.env.OPENAI_MODEL
      : 'gpt-4',
    deployment: process.env.OPENAI_DEPLOYMENT
      ? process.env.OPENAI_DEPLOYMENT
      : undefined,
  },
  mongo: {
    uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/duality-social',
    sessionCollection: 'sessions',
    sessionDatabase: 'duality-social',
    mongoSessions: true,
  },
  cookies: {
    enabled: process.env.COOKIE_ENABLED === 'true',
    /**
     * arbitrarily generated string, arbitrarily 100 characters long
     */
    secret:
      process.env.EXPRESS_SESSION_SECRET ?? '',
  },
  realm: {
    appId: 'dualitysocial-djqzy',
    redirectUri: 'http://localhost:3000',
    postLogoutRedirectUri: 'http://localhost:3000/auth/signout',
    auth: {
      facebook: {
        clientId: '602183485306096',
      },
      google: {
        clientId: '1087753896702-4e2amh2tmq7u1atm8ut1uim45j7ms398.apps.googleusercontent.com',
      }
    }
  },
  pusher: {
    appId: Number.parseInt(process.env.PUSHER_APP_ID ?? '1592034'),
    key: process.env.PUSHER_KEY ?? 'eeb22df2aaa65ce1ede4',
    secret: process.env.PUSHER_SECRET ?? undefined,
  }
};
