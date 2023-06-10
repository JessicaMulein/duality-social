import { NgxLoggerLevel } from 'ngx-logger';
import { IEnvironment } from '../core/interfaces/environment';

export const environment: IEnvironment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  msal: {
    authority: 'https://login.microsoftonline.com/consumers',
    clientId: '4679d7e6-340a-4a09-9434-744c19664c02',
    cloudInstance: 'https://login.microsoftonline.com/',
    redirectUri: 'https://duality.social',
    postLogoutRedirectUri: 'https://duality.social/auth/signout',
  },
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

