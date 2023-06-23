import { KeycloakTokenParsed } from 'keycloak-connect';

declare module 'express-session' {
  export interface SessionData {
    pkceCodes?: {
      verifier: string;
      challenge: string;
    };
    csrfToken?: string;
    authCodeUrlRequest?: {
      clientId: string;
      redirectUri: string;
      responseType: string;
      state: string;
      scope?: string;
      responseMode?: string;
    };
    authCodeRequest?: {
      clientId: string;
      redirectUri: string;
      code: string;
      clientSecret?: string;
    };
    accessToken?: string;
    kauth?: {
      grant: {
        access_token: {
          token: string;
          isExpired(): boolean;
          hasRole(role: string): boolean;
          hasApplicationRole(appName: string, roleName: string): boolean;
          hasRealmRole(roleName: string): boolean;
          content: KeycloakTokenParsed;
        };
        // Include other grant properties as needed
      };
    };
    account?: { id: string } | null; // replace with your own user type if needed
    isAuthenticated?: boolean;
    views?: number;
  }
}