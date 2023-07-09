import express, { Request, Response, Router } from 'express';
import { Request as OAuthRequest, Response as OAuthResponse } from 'oauth2-server';
import oauth from '../app/oauth.server';

const oauthRouter: Router = express.Router();

oauthRouter.all('/token', (req: Request, res: Response, next) => {
    const request = new OAuthRequest(req);
    const response = new OAuthResponse(res);

    oauth
        .token(request, response)
        .then((token) => {
            res.json(token);
        })
        .catch(next);
});

export default oauthRouter;