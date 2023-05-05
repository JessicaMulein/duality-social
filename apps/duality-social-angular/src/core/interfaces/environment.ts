import { NgxLoggerLevel } from 'ngx-logger';

export interface IEnvironment {
  production: boolean;
  logLevel: NgxLoggerLevel;
  serverLogLevel: NgxLoggerLevel;
  realm: {
    appId: string;
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
