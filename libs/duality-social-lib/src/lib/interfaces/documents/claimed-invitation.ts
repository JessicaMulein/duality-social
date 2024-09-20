import { Document, Types } from 'mongoose';
import { IClaimedInvitation } from '../models/claimed-invitation.ts';

export interface IClaimedInvitationDocument
  extends IClaimedInvitation,
    Document<Types.ObjectId, unknown, unknown> {}
