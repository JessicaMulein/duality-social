import { Document, ObjectId } from "mongoose";
import { IInvitation } from "../interfaces/invitation";

export interface InvitationDocument extends IInvitation, Document<ObjectId, any, any> {};