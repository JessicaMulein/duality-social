import { ISchemaModels } from '@duality-social/duality-social-node-lib';
import { Mongoose } from 'mongoose';

export interface IMongoDb {
  db: Mongoose;
  schema: ISchemaModels;
}
