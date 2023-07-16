import express, { Request, Response, Router } from 'express';
import oauth from '../app/oauth.server';

const oauthRouter: Router = express.Router();

oauthRouter.all('/authorize', oauth.authorize());
oauthRouter.all('/token', oauth.token());

export default oauthRouter;