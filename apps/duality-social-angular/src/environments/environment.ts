// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';
import { IEnvironment } from '../core/interfaces/environment';

export const environment: IEnvironment = {
  production: false,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  msal: {
    authority: 'https://login.microsoftonline.com/consumers', // 'https://login.microsoftonline.com/83f34336-afeb-4706-b665-02995bbdffc8/',
    clientId: 'b4ba9988-5dc4-47be-9aa1-3c9e2a70b366',
    cloudInstance: 'https://login.microsoftonline.com/',
    redirectUri: 'http://127.0.0.1:3000',
    postLogoutRedirectUri: 'http://localhost:3000/auth/signout',
  },
  domainName: 'http://localhost:3000',
  apiUrl: 'http://localhost:3000/api',
  pusher: {
    appId: 1592034,
    key: 'eeb22df2aaa65ce1ede4'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
