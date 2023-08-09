import { dirname } from 'path';
import { IEnvironment } from '../interfaces/environment';

const host = process.env.HOST ?? 'dulity.social';
const port = Number(process.env.PORT ?? 3000);
const production = process.env.NODE_ENV === 'production';
const sslEnabled = false; // process.env.SSL_ENABLED === 'true';
const urlProto = sslEnabled ? 'https://' : 'http://';
const serverHost = sslEnabled
  ? `${urlProto}${host}:${port === 443 ? '' : port}`
  : `${urlProto}${host}:${port === 80 ? '' : port}`;
const redirectHostname = process.env.REDIRECT_HOST ?? '127.0.0.1';
const redirectHost = sslEnabled
  ? `${urlProto}${redirectHostname}:${port === 443 ? '' : port}`
  : `${urlProto}${redirectHostname}:${port === 80 ? '' : port}`;
export type OpenAiProvider = 'azure' | 'openai';

export const environment: IEnvironment = {
  production: production,
  siteUrl: redirectHost,
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
  pusher: {
    appId: Number.parseInt(process.env.PUSHER_APP_ID ?? '1592034'),
    key: process.env.PUSHER_KEY ?? 'eeb22df2aaa65ce1ede4',
    secret: process.env.PUSHER_SECRET ?? undefined,
  },
};
