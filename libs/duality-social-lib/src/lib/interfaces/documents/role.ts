import { Document, Types } from 'mongoose';
import { IRole } from '../models/role.ts';

/**
 * Composite interface for role collection documents
 */
export interface IRoleDocument
  extends IRole,
    Document<Types.ObjectId, unknown, IRole> {}
