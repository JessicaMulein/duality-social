// oauthServer.ts
import { OAuth2Server, Request, Response } from 'oauth2-server';
import { User, Client, AccessToken } from '@duality-social/duality-social-lib';

const oauth = new OAuth2Server({
    model: {
        getAccessToken: async (accessToken) => {
            return await AccessToken.findOne({ accessToken });
        },
        getClient: async (clientId, clientSecret) => {
            if (clientSecret === null) {
                return await Client.findOne({ clientId });
            }
            return await Client.findOne({ clientId, clientSecret });
        },
        saveToken: async (token, client, user) => {
            const accessToken = new AccessToken({
                accessToken: token.accessToken,
                accessTokenExpiresAt: token.accessTokenExpiresAt,
                scope: token.scope,
                client: client._id,
                user: user._id,
            });
            await accessToken.save();
            return {
                accessToken: accessToken.accessToken,
                accessTokenExpiresAt: accessToken.accessTokenExpiresAt,
                scope: accessToken.scope,
                client: { id: client._id.toString(), ...client._doc },
                user: { id: user._id.toString(), ...user._doc },
            };
        },
        getUser: async (username, password) => {
            return await User.findOne({ email: username, password });
        },
        // Add other necessary methods like `getRefreshToken`, `saveRefreshToken`, `getAuthorizationCode`, `saveAuthorizationCode`, `revokeToken`, etc.
        verifyScope: async (token, scope) => {
            return token.scope === scope;
        }
    },
});
