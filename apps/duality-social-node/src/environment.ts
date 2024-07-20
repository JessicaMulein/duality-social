import { dirname } from 'path';
import { IEnvironment } from './interfaces/environment';
import 'dotenv/config'

const host = process.env.SERVER_HOST ?? 'localhost';
const port = Number(process.env.PORT ?? 3000);
const production = process.env.NODE_ENV === 'production';
const sslEnabled = process.env.SSL_ENABLED === 'true';

function getSiteUrl() {
  const proto = sslEnabled ? 'https' : 'http';
  if (sslEnabled && port === 443) {
      return `${proto}://${host}`;
  } else if (!sslEnabled && port === 80) {
      return `${proto}://${host}`;
  } else {
      return `${proto}://${host}:${port}`;
  }
}

export const environment: IEnvironment = {
  production: production,
  siteUrl: process.env.SITE_URL ?? getSiteUrl(),
  developer: {
    reactDir: dirname(dirname(__filename)) + '/duality-social-react/',
    host: host,
    port: port,
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
