import { Document, Types } from 'mongoose';
import { IInvitation } from '../models/invitation.ts';

export interface IInvitationDocument
  extends IInvitation,
    Document<Types.ObjectId, unknown, IInvitation> {}
