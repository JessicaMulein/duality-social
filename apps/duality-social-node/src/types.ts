
declare module 'express-session' {
  export interface SessionData {
    pkceCodes?: {
      verifier: string;
      challenge: string;
    };
    csrfToken?: string;
    accessToken?: string;
    idToken?: string;
    isAuthenticated?: boolean;
    views?: number;
  }
}
