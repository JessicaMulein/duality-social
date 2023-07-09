export interface IEnvironment {
    production: boolean;
    host: string;
    port: number;
    rootPath: string;
    siteUrl: string;
    mongo: {
        uri: string;
    }
    session: {
        mongoUri: string;
        secret: string;
        table: string;
        maxAge: number;
    }
}