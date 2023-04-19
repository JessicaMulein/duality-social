import express from 'express';
import session from 'express-session';
import mongoDbSession from 'connect-mongodb-session';
import { environment } from './environments/environment';

export function setupSession(app: express.Application) {
    if (environment.cookies.enabled && environment.mongo.mongoSessions) {
        console.debug('Using MongoDB sessions');
        const MongoDBStore = mongoDbSession(session);
        const store = new MongoDBStore({
            uri: environment.mongo.uri,
            databaseName: environment.mongo.sessionDatabase,
            collection: environment.mongo.sessionCollection,
        });

        // Catch errors
        store.on('error', function (error: any) {
            console.error(error);
        });

        app.use(
            session({
                secret: environment.cookies.secret,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
                },
                store: store,
                resave: true,
                saveUninitialized: true,
            })
        );
    } else if (environment.cookies.enabled) {
        console.debug('Using in-memory sessions');
        app.use(
            session({
                resave: false,
                saveUninitialized: true,
                secret: environment.cookies.secret,
            })
        );
    } else {
        console.debug('WARNING: Using no sessions');
    }
}
