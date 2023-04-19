import express from 'express';
import passport from 'passport';
import { BearerStrategy, ITokenPayload } from 'passport-azure-ad';
import { getUserFromDatabase } from './services/userService';
import { environment } from './environments/environment';

export function setupPassport(app: express.Application) {
    const config = {
        identityMetadata: 'https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration',
        clientID: environment.msal.clientId,
        loggingLevel: 'info' as const, // Add 'as const' to the loggingLevel property
        passReqToCallback: false,
    };

    const bearerStrategy = new BearerStrategy(config, async (token: ITokenPayload, done: (error: Error | null, user?: Express.User, info?: unknown) => void) => {
        // Assuming the token has the user's ID stored in the `sub` field
        const userId = token.sub ?? '';

        try {
            // Retrieve the user object from the database using the user ID
            const user = await getUserFromDatabase(userId) as Express.User;
            done(null, user, token);
        } catch (error: Error | unknown) {
            if (error instanceof Error) {
                done(error);
            } else {
                done(new Error('An unknown error occurred.'));
            }
        }
    });

    passport.use(bearerStrategy);

    // middlewares
    app.use(passport.initialize());
    app.use(passport.session());
}
