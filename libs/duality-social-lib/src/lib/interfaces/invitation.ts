import { IHasSoftDelete } from "./has-soft-delete.ts";
import { IHasTimestampOwners } from "./has-timestamp-owners.ts";
import { IHasTimestamps } from "./has-timestamps.ts";

export interface IInvitation extends IHasTimestamps, IHasSoftDelete, IHasTimestampOwners {
    email?: string;
    phone?: string;
    token?: string;
    maxUses?: number;
    metadata: {
        uses: number;
        views: number;
    };
}