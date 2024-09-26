import {
  ModelName,
  ModelNameCollection,
} from '@duality-social/duality-social-lib';
import { Schema } from 'mongoose';

export interface IModelData {
  readonly name: ModelName;
  readonly description: string;
  readonly collection: ModelNameCollection;
  readonly schema: Schema;
  readonly path: string;
}
