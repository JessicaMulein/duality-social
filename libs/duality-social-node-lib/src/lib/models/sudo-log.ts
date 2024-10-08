import { ISudoLogDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const SudoLogModel = model<ISudoLogDocument>(
  ModelData.SudoLog.name,
  ModelData.SudoLog.schema,
  ModelData.SudoLog.collection,
);
