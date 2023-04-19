import express from 'express';
import { cors as corslib } from './cors';
import logger from 'morgan';
import { json } from 'body-parser';
import { environment } from './environments/environment';
import compression from 'compression';

export function setupMiddlewares(app: express.Application) {
    app.use(corslib);
    app.use(compression());
    app.use(json());
    app.use(express.json());
    app.use(logger('dev'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(environment.developer.appFolder, {
        index: ['index.html'],
    }));
}
