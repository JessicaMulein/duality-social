import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { environment } from '../environment';
import { Application } from 'express';

export function addPassport(app: Application) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new OAuth2Strategy({
        authorizationURL: `${environment.siteUrl}/oauth/authorize`,
        tokenURL: `${environment.siteUrl}/oauth/token`,
        clientID: environment.oauth.clientId,
        clientSecret: environment.oauth.clientSecret,
        callbackURL: `${environment.siteUrl}/auth/callback`,
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile', profile);
        return cb(null, profile);
    }
    ));

    // Passport serialization and deserialization
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj: any, done) => done(null, obj));
}