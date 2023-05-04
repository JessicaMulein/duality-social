import express from 'express';
import { apiRouter } from './routes/api.route';
import { authRouter } from './routes/auth.route';
import { usersRouter } from './routes/users.route';
import { adminRouter } from './routes/admin.route';
import { environment } from './environments/environment';
import { ensureAdmin, ensureAuthenticated } from './auth.middleware';

export function setupRoutes(app: express.Application) {
    app.use('/', express.static(environment.developer.angularDir));
    app.use('/auth', authRouter);
    app.use('/admin', ensureAdmin, adminRouter);
    app.use('/api', apiRouter); // TODO: ensureAuthenticated
    app.use('/users', usersRouter);
    // fallback to index.html for anything unknown
    app.get('*', (req, res) => {
        res.sendFile('index.html', { root: environment.developer.angularDir });
    });
}
