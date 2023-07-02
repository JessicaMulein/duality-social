import { dirname } from 'path';
import { IEnvironment } from '../interfaces/environment';

//const authority = cloudInstance + tenantId + '/';
const host = process.env.SERVER_HOST ?? 'localhost';
const port = Number(process.env.PORT ?? 3000);
const production = process.env.NODE_ENV === 'production';
const keycloakIssuer = process.env.KEYCLOAK_URI ?? production ? 'http://auth.duality.social/auth' : 'http://localhost:8080/auth';
const sslEnabled = false; // process.env.SSL_ENABLED === 'true';
const urlProto = sslEnabled ? 'https://' : 'http://';
const serverHost = sslEnabled
  ? `${urlProto}${host}:${port === 443 ? '' : port}`
  : `${urlProto}${host}:${port === 80 ? '' : port}`;
const redirectHostname = process.env.REDIRECT_HOST ?? '127.0.0.1';
const redirectHost = sslEnabled
  ? `${urlProto}${redirectHostname}:${port === 443 ? '' : port}`
  : `${urlProto}${redirectHostname}:${port === 80 ? '' : port}`;
const redirectUri = process.env.KEYCLOAK_REDIRECT_URI ?? `${redirectHost}/auth/redirect`;

export const environment: IEnvironment = {
  production: production,
  developer: {
    angularDir: dirname(dirname(__filename)) + '/duality-social-angular/',
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
    model: process.env.OPENAI_MODEL ? process.env.OPENAI_MODEL : 'gpt-4',
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
    secret: process.env.EXPRESS_SESSION_SECRET ?? '',
  },
  keycloak: {
    adminUser: process.env.KEYCLOAK_ADMIN ?? 'admin',
    adminPassword: process.env.KEYCLOAK_ADMIN_PASSWORD ?? 'keycloak-admin-password',
    clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'duality-social-dev',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? '',
    registrationToken: process.env.KEYCLOAK_REGISTRATION_TOKEN ?? '',
    redirectUri: redirectUri,
    issuer: keycloakIssuer,
    realm: process.env.KEYCLOAK_REALM ?? 'duality-social-dev'
  },
  pusher: {
    appId: Number.parseInt(process.env.PUSHER_APP_ID ?? ''),
    key: process.env.PUSHER_KEY ?? '',
    secret: process.env.PUSHER_SECRET ?? '',
  },
};
