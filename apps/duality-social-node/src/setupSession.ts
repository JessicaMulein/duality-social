import express = require('express');
import session = require('express-session');
import MongoDBStore = require('connect-mongodb-session')
const mongoStore = MongoDBStore(session);
import { environment } from './environments/environment';
import { Express } from 'express-serve-static-core';

export async function getSessionConfig(app: Express) {
    if (environment.cookies.enabled && environment.mongo.mongoSessions) {
        console.debug('Using MongoDB sessions');
        const store = new mongoStore({
            uri: environment.mongo.uri,
            databaseName: environment.mongo.sessionDatabase,
            collection: environment.mongo.sessionCollection,
        });

        return {
            secret: environment.cookies.secret,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            },
            store: store,
            resave: true,
            saveUninitialized: true,
        };
    } else if (environment.cookies.enabled) {
        console.debug('Using in-memory sessions');
        return {
            resave: false,
            saveUninitialized: true,
            secret: environment.cookies.secret,
        };
    } else {
        console.debug('WARNING: Using no sessions');
        return null;
    }
}