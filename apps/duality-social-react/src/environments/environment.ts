// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
import { IEnvironment } from '../interfaces/environment.ts';
export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  siteUrl: 'http://localhost:3000',
};
