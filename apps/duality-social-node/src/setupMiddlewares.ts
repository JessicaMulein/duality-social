import {Application, json as expressJson, urlencoded, static as expressStatic } from 'express';
import { cors as corslib } from './cors';
import logger from 'morgan';
import { json } from 'body-parser';
import { environment } from './environment';
import compression from 'compression';
import path from 'path';
import { authenticateJWT } from './middlewares/authenticateJwt';

const serveStaticOptions = {
    index: ['index.html'],
};

export function setupMiddlewares(app: Application) {
    app.use(corslib);
    app.use(compression());
    app.use(json());
    app.use(expressJson());
    app.use(logger('dev'));
    app.use(urlencoded({ extended: true }));
    app.use(expressStatic(environment.developer.reactDir, serveStaticOptions));
    app.use('/assets', expressStatic(path.join(environment.developer.reactDir, 'src', 'assets')));
    app.use(authenticateJWT);
}
