import mongoose, { connect, set } from 'mongoose';
import { environment } from './environments/environment';
import { ISchemaModels, SchemaModels } from '@duality-social/duality-social-lib';


export async function setupDatabase(): Promise<{db: mongoose.Mongoose, schema: ISchemaModels}> {
  set('strictQuery', true);
  const db = await connect(environment.mongo.uri, {
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    waitQueueTimeoutMS: 30000,
  });
  return { db, schema: SchemaModels};
}