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
const redirectUri = process.env.FUSIONAUTH_REDIRECT_URI ?? `${redirectHost}/auth/redirect`;

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
    clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'duality-social-dev',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? 'X1FrSkWZPzI0mpd3BobxIFAIHwFqJC11',
    registrationToken: process.env.KEYCLOAK_REGISTRATION_TOKEN ?? 'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwNzFhZGEwZS0xNTA4LTRmY2YtYjM3Mi04NjExY2NjMTUxYzAifQ.eyJleHAiOjAsImlhdCI6MTY4ODA2NTYwNCwianRpIjoiZTAwZjU0ZTItNzEyYi00MTExLWJjM2QtYmJkMmNkNDdhMDVjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9kdWFsaXR5LXNvY2lhbC1kZXYiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2R1YWxpdHktc29jaWFsLWRldiIsInR5cCI6IlJlZ2lzdHJhdGlvbkFjY2Vzc1Rva2VuIiwicmVnaXN0cmF0aW9uX2F1dGgiOiJhdXRoZW50aWNhdGVkIn0.zc-cev_P95L-iJqCTWZhkjj5YyYwWhEyOShq8RA7Uc4',
    redirectUri: redirectUri,
    issuer: keycloakIssuer,
    realm: process.env.KEYCLOAK_REALM ?? 'duality-social-dev'
  },
  pusher: {
    appId: Number.parseInt(process.env.PUSHER_APP_ID ?? '1592034'),
    key: process.env.PUSHER_KEY ?? 'eeb22df2aaa65ce1ede4',
    secret: process.env.PUSHER_SECRET ?? undefined,
  },
};
