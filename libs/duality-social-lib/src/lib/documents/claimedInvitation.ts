import { Document, ObjectId } from "mongoose";
import { IClaimedInvitation } from "../interfaces/claimedInvitation";

export interface ClaimedInvitationDocument extends IClaimedInvitation, Document<ObjectId, any, any> {};