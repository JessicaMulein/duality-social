import mongoose, { Connection } from 'mongoose';

import { environment } from '../environment';

export function addMongoose(cb: (connection: Connection) => undefined) {
    mongoose
        .connect(environment.mongo.uri)
        .then((db: typeof mongoose) => {
            console.log('Connected to MongoDB');
            cb(db.connection);
        })
        .catch((error) => console.error('MongoDB connection error:', error));
}