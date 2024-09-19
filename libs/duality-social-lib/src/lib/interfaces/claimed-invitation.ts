import { Types } from "mongoose";

export interface IClaimedInvitation {
    invitationId: Types.ObjectId;
    ip: string;
    email?: string;
    code?: string;
    phone?: string;
    createdAt?: Date;
}