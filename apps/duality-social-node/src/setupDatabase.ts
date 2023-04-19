import mongoose from 'mongoose';
import { environment } from './environments/environment';
import { MongooseSchemas } from '@duality-social/duality-social-lib';

export async function setupDatabase() {
  const Schemas = MongooseSchemas;
  mongoose.set('strictQuery', true);
  await mongoose.connect(environment.mongo.uri);
}
