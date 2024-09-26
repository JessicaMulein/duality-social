import { IInvitationDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const InvitationModel = model<IInvitationDocument>(
  ModelData.Invitation.name,
  ModelData.Invitation.schema,
  ModelData.Invitation.collection,
);
