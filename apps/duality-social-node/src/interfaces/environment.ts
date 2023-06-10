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
    msal: {
      clientId: string;
      cloudInstance: string;
      graphMeEndpoint: string;
      authority: string;
      postLogoutRedirectUri: string;
      tenantId: string;
      redirectUri: string;
      scope: string;
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
  if (!environment.msal.clientId) {
    throw new Error('CLIENT_ID is not set');
  }
  if (!environment.msal.tenantId) {
    throw new Error('TENANT_ID is not set');
  }
  if (!environment.msal.redirectUri) {
    throw new Error('MSAL_REDIRECT_URI is not set');
  }
  if (!environment.msal.postLogoutRedirectUri) {
    throw new Error('MSAL_POST_LOGOUT_REDIRECT_URI is not set');
  }
  if (!environment.msal.graphMeEndpoint) {
    throw new Error('GRAPH_API_ENDPOINT is not set');
  }
  if (!environment.cookies.secret) {
    throw new Error('EXPRESS_SESSION_SECRET is not set');
  }
  if (!environment.mongo.uri) {
    throw new Error('MONGO_URI is not set');
  }
  then(environment);
}
