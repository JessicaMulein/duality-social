export type OpenAiProvider = 'azure' | 'openai';

export interface IEnvironment {
    production: boolean;
    serverUrl: string;
    jwtSecret: string;
    jwtExpiration: string;
    sendgridKey: string;
    developer: {
      reactDir: string;
      host: string;
      port: number;
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
    aws: {
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
      bucketName: string;
    }
  };

  
export function validateEnvironment(environment: IEnvironment, then: () => void) {
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
  if (!environment.sendgridKey) {
    throw new Error('SENDGRID_API_KEY is not set');
  }
  if (!environment.sendgridKey.startsWith('SG')) {
    throw new Error(`SENDGRID_API_KEY does not start with "SG": ${environment.sendgridKey}`);
  }
  if (!environment.aws.accessKeyId) {
    throw new Error('AWS_ACCESS_KEY_ID is not set');
  }
  if (!environment.aws.secretAccessKey) {
    throw new Error('AWS_SECRET_ACCESS_KEY is not set');
  }
  if (!environment.aws.region) {
    throw new Error('AWS_REGION is not set');
  }
  then();
}
