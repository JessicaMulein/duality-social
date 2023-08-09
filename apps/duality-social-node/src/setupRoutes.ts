import express from 'express';
import { apiRouter } from './routes/api.route';
import { usersRouter } from './routes/users.route';
import { environment } from './environments/environment';

export function setupRoutes(app: express.Application) {
    app.use('/', express.static(environment.developer.angularDir));
    //app.use('/auth', authRouter);
    app.use('/api', apiRouter); // TODO: ensureAuthenticated
    app.use('/users', usersRouter);
    // fallback to index.html for anything unknown
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: environment.developer.angularDir });
    });
}
