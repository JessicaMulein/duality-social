export type OpenAiProvider = 'azure' | 'openai';

export interface IEnvironment {
    production: boolean;
    developer: {
      angularDir: string;
      host: string;
      port: number;
      baseUrl: string;
      sslEnabled: boolean;
    };
    openai: {
      type: OpenAiProvider;
      accessToken: string;
      organization?: string;
      model?: string;
      deployment?: string;
    };
    mongo: {
      uri: string;
      sessionCollection: string;
      sessionDatabase: string;
      mongoSessions: boolean;
    };
    cookies: {
      enabled: boolean;
      secret: string;
    };
    keycloak: {
      realm: string;
      issuer: string;
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      registrationToken: string;
    };
    pusher: {
      appId: number;
      key: string;
      secret?: string; // only populated after the server is started
    }
  };

  
export function validateEnvironment(environment: IEnvironment, then: (environment: IEnvironment) => void) {
  // ensure all required environment variables are set
  if (!environment.openai.accessToken) {
    throw new Error('OPENAI_API_KEY is not set');
  }
  if (!environment.fusionAuth.clientId) {
    throw new Error('CLIENT_ID is not set');
  }
  if (!environment.fusionAuth.redirectUri) {
    throw new Error('FUSIONAUTH_REDIRECT_URI is not set');
  }
  if (!environment.cookies.secret) {
    throw new Error('EXPRESS_SESSION_SECRET is not set');
  }
  if (!environment.mongo.uri) {
    throw new Error('MONGO_URI is not set');
  }
  then(environment);
}
