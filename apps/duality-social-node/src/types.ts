
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
    account?: { id: string } | null; // replace with your own user type if needed
    isAuthenticated?: boolean;
    views?: number;
  }
}