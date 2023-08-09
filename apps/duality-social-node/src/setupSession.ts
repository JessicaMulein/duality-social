import express from 'express';
import session, { SessionOptions } from 'express-session';
import MongoStore from 'connect-mongo';
import { environment } from './environments/environment';

export async function setupSession(app: express.Application): Promise<SessionOptions | null> {
    if (environment.cookies.enabled && environment.mongo.mongoSessions) {
        console.debug('Using MongoDB sessions');
        const MongoDBStore = MongoStore.create({
            mongoUrl: environment.mongo.uri,
            dbName: environment.mongo.sessionDatabase,
            collectionName: environment.mongo.sessionCollection
        });
        
        return {
                secret: environment.cookies.secret,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                },
                store: MongoDBStore,
                resave: true,
                saveUninitialized: true,
            };
    } else if (environment.cookies.enabled) {
        console.debug('Using in-memory sessions');
            return {
                resave: false,
                saveUninitialized: true,
                secret: environment.cookies.secret,
            }
    } else {
        console.debug('WARNING: Using no sessions');
        return null;
    }
}
