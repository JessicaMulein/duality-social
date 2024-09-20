import { Schema } from 'mongoose';
import {
  ModelName,
  ModelNameCollection,
} from '@duality-social/duality-social-lib';

export interface IModelData {
  readonly name: ModelName;
  readonly description: string;
  readonly collection: ModelNameCollection;
  readonly schema: Schema;
  readonly path: string;
}
