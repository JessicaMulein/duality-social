import { AccountInfo, AuthorizationCodeRequest, AuthorizationUrlRequest } from '@azure/msal-node';

declare module 'express-session' {
  export interface SessionData {
    pkceCodes?: {
      verifier: string;
      challenge: string;
    };
    csrfToken?: string;
    authCodeUrlRequest?: AuthorizationUrlRequest;
    authCodeRequest?: AuthorizationCodeRequest;
    accessToken?: string;
    idToken?: string;
    account?: AccountInfo | null;
    isAuthenticated?: boolean;
    views?: number;
  }
}
