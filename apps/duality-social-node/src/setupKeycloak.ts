import express from 'express';
import session from 'express-session';
import Keycloak from 'keycloak-connect';
import { MongoClient } from 'mongodb';
import { MongoDBStore } from 'connect-mongodb-session';
import { environment } from './environments/environment';
import { createUser, getUserFromDatabaseByToken } from './services/userService';


export const sessionStore = new MongoDBStore({
    uri: environment.mongo.uri,
    collection: 'sessions',
});

export const keycloak = new Keycloak({ store: sessionStore }, {
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId,
    serverUrl: environment.keycloak.issuer,
    secret: environment.keycloak.clientSecret
});

export function setupKeycloak(app: express.Application) {
    app.use(session({
        secret: environment.cookies.secret,
        resave: false,
        saveUninitialized: true,
        store: sessionStore
    }));

    app.use(keycloak.middleware());

    app.use((req, res, next) => {
        if (req.kauth && req.kauth.grant) {
            const accessToken = req.kauth.grant.access_token.token;
            getUserFromDatabaseByToken(accessToken)
                .then(user => {
                    if (!user) {
                        createUser(accessToken); // Pass the accessToken or any other required data to create a new user
                    }
                })
                .catch(error => {
                    console.error('An error occurred:', error);
                });
        }
        next();
    });

    if (!environment.production) {
        // Enable CORS (for local testing only -remove in production/deployment)
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    }
}