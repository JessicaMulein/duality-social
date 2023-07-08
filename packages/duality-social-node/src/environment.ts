import { randomBytes } from "crypto";
import path from "path";
import { IEnvironment } from "./interfaces/environment";

export const environment: IEnvironment = {
    production: process.env.NODE_ENV === 'production',
    host: process.env.HOST ?? 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    rootPath: process.env.ROOT_PATH ?? path.join(__dirname, '../../../../../..'),
    siteUrl: process.env.SITE_URL ?? 'http://localhost:3000',
    session: {
        secret: process.env.SESSION_SECRET ?? randomBytes(20).toString('hex'),
        table: process.env.SESSION_TABLE ?? 'sessions',
        maxAge: 30 * 24 * 60 * 60 * 1000, // Set the session expiration time (e.g., 30 days)
    },
    postgres: {
        database: process.env.DUALITY_DB_NAME ?? 'duality',
        host: process.env.DUALITY_DB_HOST ?? 'postgres',
        password: process.env.DUALITY_DB_PASSWORD ?? 'duality',
        user: process.env.DUALITY_DB_USER ?? 'duality',
        port: process.env.DUALITY_DB_PORT ? Number(process.env.DUALITY_DB_PORT) : 5432,
    }
}