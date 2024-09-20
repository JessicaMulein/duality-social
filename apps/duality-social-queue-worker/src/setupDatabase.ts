import { connect, set } from 'mongoose';
import { SchemaModels } from '@duality-social/duality-social-lib';
import { environment } from './environments/environment.ts';
import { IMongoDb } from './interfaces/mongodb.ts';


export async function setupDatabase(): Promise<IMongoDb> {
  set('strictQuery', true);
  const db = await connect(environment.mongo.uri, {
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    waitQueueTimeoutMS: 30000,
  });
  return { db, schema: SchemaModels};
}