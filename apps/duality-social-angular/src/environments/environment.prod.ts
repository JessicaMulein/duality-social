import { NgxLoggerLevel } from 'ngx-logger';
import { IEnvironment } from '../core/interfaces/environment';

export const environment: IEnvironment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  // save: {
  //   clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6',
  //   redirectUri: 'https://duality.social',
  //   postLogoutRedirectUri: 'https://duality.social/auth/signout',
  // },
  domainName: 'https://duality.social',
  apiUrl: 'https://duality.social/api',
  pusher: {
    appId: 1592034,
    key: 'eeb22df2aaa65ce1ede4'
  }
};

