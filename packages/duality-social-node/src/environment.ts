import { randomBytes } from "crypto";
import path from "path";
import { IEnvironment } from "./interfaces/environment";

export const environment: IEnvironment = {
    production: process.env.NODE_ENV === 'production',
    host: process.env.HOST ?? 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    rootPath: process.env.ROOT_PATH ?? path.join(__dirname, '../../../../../..'),
    siteUrl: process.env.SITE_URL ?? 'http://localhost:3000',
    mongo: {
        uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/duality-social',
    },
    session: {
        mongoUri: process.env.MONGO_SESSION_URI ?? 'mongodb://localhost:27017/sessions',
        secret: process.env.SESSION_SECRET ?? randomBytes(20).toString('hex'),
        table: process.env.SESSION_TABLE ?? 'sessions',
        maxAge: 30 * 24 * 60 * 60 * 1000, // Set the session expiration time (e.g., 30 days)
    }
};