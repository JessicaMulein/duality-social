// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { IEnvironment } from "../interfaces/environment";

export const environment: IEnvironment = {
  production: false,
  keycloak: {
    url: 'http://localhost:28080',
    realm: 'duality-social-dev',
    clientId: 'duality-social-dev'
  }
};