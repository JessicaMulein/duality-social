import { Document, Types } from 'mongoose';
import { IEmailToken } from '../models/email-token.ts';

/**
 * Composite interface for email token collection documents
 */
export interface IEmailTokenDocument
  extends IEmailToken,
    Document<Types.ObjectId, unknown, IEmailToken> {}
