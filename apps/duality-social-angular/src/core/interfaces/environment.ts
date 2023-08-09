import { NgxLoggerLevel } from 'ngx-logger';

export interface IEnvironment {
  production: boolean;
  logLevel: NgxLoggerLevel;
  serverLogLevel: NgxLoggerLevel;
  domainName: string;
  apiUrl: string;
  pusher: {
    appId: number;
    key: string;
  };
}
