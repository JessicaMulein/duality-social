export interface IEnvironment {
    production: boolean;
    host: string;
    port: number;
    rootPath: string;
    siteUrl: string;
    oauth: {
        clientId: string;
        clientSecret: string;
    }
    mongo: {
        uri: string;
    }
    rateLimiter: {
        windowMs: number;
        max: number;
    }
    session: {
        maxAge: number;
        mongoUri: string;
        resave: boolean;
        saveUninitialized: boolean;
        secret: string;
    }
}