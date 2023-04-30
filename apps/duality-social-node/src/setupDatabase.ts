import mongoose from 'mongoose';
import { environment } from './environments/environment';
import { MongooseSchemas, PasswordRounds, UserSchema } from '@duality-social/duality-social-lib';
import { hashSync } from 'bcryptjs';

export async function setupDatabase() {
  const Schemas = MongooseSchemas;
  mongoose.set('strictQuery', true);
  await mongoose.connect(environment.mongo.uri);
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