import { NgxLoggerLevel } from 'ngx-logger';

export interface IEnvironment {
  production: boolean;
  logLevel: NgxLoggerLevel;
  serverLogLevel: NgxLoggerLevel;
  msal: {
    authority: string;
    clientId: string;
    cloudInstance: string;
    redirectUri: string;
    postLogoutRedirectUri: string;
  };
  domainName: string;
  apiUrl: string;
  pusher: {
    appId: number;
    key: string;
  };
}
