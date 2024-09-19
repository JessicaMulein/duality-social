import { Types } from "mongoose";
import { IHasTimestamps } from "./has-timestamps.ts";

export interface IAdminUser extends IHasTimestamps {
    userId: Types.ObjectId
    lastSudo?: Date;
    lastFailedSudo?: Date;
    sudoHash: string;
    sudoHashSalt: string;
    get canSudo(): boolean;
  }