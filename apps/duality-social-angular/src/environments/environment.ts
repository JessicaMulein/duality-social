// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';
import { IEnvironment } from '../core/interfaces/environment';

export const environment: IEnvironment = {
  production: false,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  realm: {
    appId: 'dualitysocial-djqzy',
    redirectUri: 'http://localhost:3000',
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
