export interface IEnvironment {
    production: boolean;
    host: string;
    port: number;
    rootPath: string;
    siteUrl: string;
    session: {
        secret: string;
        table: string;
        maxAge: number;
    },
    postgres: {
        user: string;
        host: string;
        database: string;
        password: string;
        port: number;
    }
}