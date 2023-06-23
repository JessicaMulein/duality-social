import { NgxLoggerLevel } from 'ngx-logger';

export interface IEnvironment {
  production: boolean;
  logLevel: NgxLoggerLevel;
  serverLogLevel: NgxLoggerLevel;
  keycloak: {
    realm: string;
    issuer: string;
    clientId: string;
    redirectUri: string;
  };
  domainName: string;
  apiUrl: string;
  mongo: {
    uri: string;
  };
  pusher: {
    appId: number;
    key: string;
  };
}
