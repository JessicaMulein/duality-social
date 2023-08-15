import { IHasID } from "./hasId";
import { IInvitation } from "./invitation";

export interface IClaimedInvitation extends IHasID {
    invitationId: IInvitation['_id'];
    ip: string;
    email?: string;
    code?: string;
    phone?: string;
    createdAt?: Date;
}