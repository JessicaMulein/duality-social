import { Document, Types } from "mongoose";
import { IInvitation } from "../interfaces/invitation.ts";

export interface IInvitationDocument extends IInvitation, Document<Types.ObjectId, any, any> {};