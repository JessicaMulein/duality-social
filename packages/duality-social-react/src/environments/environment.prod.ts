import { IEnvironment } from "../interfaces/environment";

export const environment: IEnvironment = {
  production: true,
  keycloak: {
    url: 'http://auth.duality.social/auth',
    realm: 'duality-social',
    clientId: 'duality-social'
  }
};
