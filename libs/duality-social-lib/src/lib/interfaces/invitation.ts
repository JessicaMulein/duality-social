import { IHasSoftDelete } from "./hasSoftDelete";
import { IHasTimestampOwners } from "./hasTimestampOwners";
import { IHasTimestamps } from "./hasTimestamps";

export interface IInvitation extends IHasTimestamps, IHasSoftDelete, IHasTimestampOwners {
    email?: string;
    phone?: string;
    code?: string;
    maxUses?: number;
    metadata: {
        uses: number;
        views: number;
    };
}