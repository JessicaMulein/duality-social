import { NgxLoggerLevel } from 'ngx-logger';
import { IEnvironment } from '../core/interfaces/environment';

export const environment: IEnvironment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  keycloak: {
    issuer: 'http://auth.duality.social/auth',
    realm: 'duality-social',
    clientId: 'duality-social',
    redirectUri: 'https://duality.social'
  },
  domainName: 'https://duality.social',
  apiUrl: 'https://duality.social/api',
  mongo: {
    uri: ''
  },
  pusher: {
    appId: 1592034,
    key: 'eeb22df2aaa65ce1ede4'
  }
};

