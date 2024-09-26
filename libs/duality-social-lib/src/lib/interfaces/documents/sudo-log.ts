import { Document, Types } from 'mongoose';
import { ISudoLog } from '../models/sudo-log.ts';

export interface ISudoLogDocument
  extends ISudoLog,
    Document<Types.ObjectId, unknown, ISudoLog> {}
