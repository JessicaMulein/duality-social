import { model } from "mongoose";
import { IInvitationDocument } from "../documents/invitation.ts";
import { ModelData } from "../schema-model-data.ts";

export const InvitationModel = model<IInvitationDocument>(ModelData.Invitation.name, ModelData.Invitation.schema, ModelData.Invitation.collection);