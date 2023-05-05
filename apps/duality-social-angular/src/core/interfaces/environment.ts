import { NgxLoggerLevel } from 'ngx-logger';

export interface IEnvironment {
  production: boolean;
  logLevel: NgxLoggerLevel;
  serverLogLevel: NgxLoggerLevel;
  realm: {
    appId: string;
    redirectUri: string;
    postLogoutRedirectUri: string;
    auth: {
      facebook?: {
        clientId: string;
      }
      google?: {
        clientId: string;
      }
    }
  };
  domainName: string;
  apiUrl: string;
  pusher: {
    appId: number;
    key: string;
  };
}
