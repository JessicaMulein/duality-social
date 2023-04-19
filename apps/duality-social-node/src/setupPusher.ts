import express from 'express';
import Pusher from 'pusher';
import { environment } from './environments/environment';

export function setupPusher(app: express.Application) {
    const pusher = new Pusher({
        appId: environment.pusher.appId.toString() ?? '1592034',
        key: process.env['PUSHER_KEY'] ?? 'eeb22df2aaa65ce1ede4',
        secret: process.env['PUSHER_SECRET'] ?? '',
        cluster: 'us3',
        useTLS: true,
    });

    app.post('/pusher/trigger', (req, res) => {
        const { channel, event, payload } = req.body;
        pusher.trigger(channel, event, payload);
        res.sendStatus(200);
    });
}
