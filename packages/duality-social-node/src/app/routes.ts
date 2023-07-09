import express, { Application, Request, Response } from "express";
import path from 'path';

import { environment } from '../environment';
import apiRouter from '../routers/api.router';
import oauthRouter from '../routers/oauth.router';

export function addRoutesAndServeStatic(app: Application) {
    app.use(express.static(path.join(environment.rootPath, 'dist/packages/duality-social-react')));

    app.use('/api', apiRouter);
    app.use('/oauth', oauthRouter);

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(environment.rootPath, 'dist/packages/duality-social-react/index.html'));
    });
}