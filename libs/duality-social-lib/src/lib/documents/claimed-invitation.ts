import { Document, Types } from "mongoose";
import { IClaimedInvitation } from "../interfaces/claimed-invitation.ts";

export interface IClaimedInvitationDocument extends IClaimedInvitation, Document<Types.ObjectId, any, any> {};