export type OpenAiProvider = 'azure' | 'openai';

export interface IEnvironment {
    production: boolean;
    siteUrl: string;
    developer: {
      reactDir: string;
      host: string;
      port: number;
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
    };
    cookies: {
      enabled: boolean;
      secret: string;
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
  if (!environment.cookies.secret) {
    throw new Error('EXPRESS_SESSION_SECRET is not set');
  }
  if (!environment.mongo.uri) {
    throw new Error('MONGO_URI is not set');
  }
  then(environment);
}
