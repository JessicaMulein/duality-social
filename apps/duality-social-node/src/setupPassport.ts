import express from 'express';
import passport from 'passport';
import { BearerStrategy, ITokenPayload } from 'passport-azure-ad';
import { getUserFromDatabase, createUser } from './services/userService';
import { environment } from './environments/environment';

const realm = 'consumers'; // the tenantId for this should be 9188040d-6c67-4c5b-b112-36a304b66dad
const version = 'v2.0';

export function setupPassport(app: express.Application) {
    const config = {
        identityMetadata: `https://${environment.msal.authority}/${realm}/${version}/.well-known/openid-configuration`,
        issuer: `https://${environment.msal.authority}/${environment.msal.tenantId}/${version}`,
        clientID: environment.msal.clientId,
        audience: environment.msal.clientId,
        validateIssuer: true,
        passReqToCallback: false,
        loggingLevel: 'info' as const, // Add 'as const' to the loggingLevel property
        scope: environment.msal.scope.split(', '),
    };
    console.log('config', config)

    const bearerStrategy = new BearerStrategy(config, async (token: ITokenPayload, done: (error: Error | null, user?: Express.User, info?: unknown) => void) => {
        // Assuming the token has the user's ID stored in the `sub` field
        const userId = token.sub ?? '';

        try {
            // Retrieve the user object from the database using the user ID
            let user = await getUserFromDatabase(userId) as Express.User;

            // If the user does not exist in the database, create a new user
            if (!user) {
                user = await createUser(token); // Pass the token or any other required data to create a new user
            }

            done(null, user, token);
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                done(error);
            } else {
                done(new Error('An unknown error occurred.'));
            }
        }
    });


    // middlewares
    app.use(passport.initialize());
    passport.use(bearerStrategy);
    //app.use(passport.session());
    //app.use(passport.authenticate('oauth-bearer', { session: environment.cookies.enabled }));
    if (!environment.production) {
        // Enable CORS (for local testing only -remove in production/deployment)
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    }
}
