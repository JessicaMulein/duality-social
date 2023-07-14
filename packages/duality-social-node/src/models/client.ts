import { model, Schema } from 'mongoose';
import { IClient } from '@duality-social/duality-social-lib';

export const ClientModelName = 'Client';

export const ClientSchema = new Schema<IClient>({
    clientId: { type: String, unique: true, required: true },
    clientSecret: { type: String, required: true },
    redirectUris: { type: [String], required: true },
    grants: { type: [String], required: true },
  });

  export const Client = model<IClient>(ClientModelName, ClientSchema);