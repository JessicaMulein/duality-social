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
    rateLimiter: {
        windowMs: process.env.RATE_LIMITER_WINDOW_MS ? Number(process.env.RATE_LIMITER_WINDOW_MS) : 15 * 60 * 1000, // 15 minutes
        max: process.env.RATE_LIMITER_MAX ? Number(process.env.RATE_LIMITER_MAX) : 1000, // limit each IP to 1000 requests per windowMs
    },
    session: {
        mongoUri: process.env.MONGO_SESSION_URI ?? 'mongodb://localhost:27017/sessions',
        secret: process.env.SESSION_SECRET ?? randomBytes(20).toString('hex'),
        maxAge: process.env.SESSION_MAX_AGE ? Number(process.env.SESSION_MAX_AGE) : 30 * 24 * 60 * 60 * 1000,
    }
};

if (environment.port <= 0) {
    throw new Error('PORT must be greater than 0');
}
if (environment.rateLimiter.windowMs <= 0) {
    throw new Error('RATE_LIMITER_WINDOW_MS must be greater than 0');
}
if (environment.rateLimiter.max <= 0) {
    throw new Error('RATE_LIMITER_MAX must be greater than 0');
}
if (environment.session.maxAge <= 0) {
    throw new Error('SESSION_MAX_AGE must be greater than 0');
}