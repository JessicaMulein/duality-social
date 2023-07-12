export interface IEnvironment {
    production: boolean;
    host: string;
    port: number;
    rootPath: string;
    siteUrl: string;
    mongo: {
        uri: string;
    }
    rateLimiter: {
        windowMs: number;
        max: number;
    }
    session: {
        mongoUri: string;
        secret: string;
        maxAge: number;
    }
}