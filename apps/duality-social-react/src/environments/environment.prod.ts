import { IEnvironment } from "../interfaces/environment";

export const environment: IEnvironment = {
  production: true,
  auth0: {
    domain: "dualitysocial.us.auth0.com",
    clientId: 'kied50wLCcbqzCQaH4ib8S7bgMnEcFLD',
    audience: 'https://dualitysocial.us.auth0.com/api/v2/'
  }
};
