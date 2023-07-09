import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Application } from 'express';

import { environment } from '../environment';

export const mongoStore = MongoStore.create({
    mongoUrl: environment.session.mongoUri,
});

export function addMongoSession(app: Application) {
    app.use(
        session({
            secret: environment.session.secret,
            resave: environment.session.resave,
            saveUninitialized: environment.session.saveUninitialized,
            store: mongoStore,
        })
    );
}