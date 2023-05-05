import mongoose from 'mongoose';
import { environment } from './environments/environment';
import { MongooseSchemas, PasswordRounds, UserSchema } from '@duality-social/duality-social-lib';
import { hashSync } from 'bcryptjs';


let db: mongoose.Mongoose | undefined;
const Schemas = MongooseSchemas;

export async function setupDatabase() {
  mongoose.set('strictQuery', true);
  db = await mongoose.connect(environment.mongo.uri, {
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    waitQueueTimeoutMS: 30000,
  });
}

export async function getDatabase(): Promise<mongoose.Mongoose> {
  if (!db) {
    await setupDatabase();
    if (db === undefined) {
      throw new Error('Database not initialized');
    }
  }
  return db;
}

export function getSchemas() {
  return Schemas;
}

UserSchema.pre('save', function (next) {
  if (!this.isModified('accountPasswordHash')) {
    return next();
  }
  if ( !this.accountPasswordHash ) {
    return next();
  }
  const hashedPassword = hashSync(this.accountPasswordHash, PasswordRounds);
  this.accountPasswordHash = hashedPassword;
  next();
});