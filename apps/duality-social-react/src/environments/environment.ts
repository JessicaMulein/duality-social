// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
import { IEnvironment } from '../interfaces/environment';
export const environment: IEnvironment = {
  production: false,
  auth0: {
    domain: 'dualitysocial.us.auth0.com',
    clientId: 'kied50wLCcbqzCQaH4ib8S7bgMnEcFLD',
    audience: 'https://dualitysocial.us.auth0.com/api/v2/'
  }
};
