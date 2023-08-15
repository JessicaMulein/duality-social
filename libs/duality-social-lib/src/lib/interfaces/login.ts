import { Schema } from "mongoose";
import { IHasID } from "./hasId";

export interface ILogin extends IHasID {
    userId: Schema.Types.ObjectId;
    ip: string;
    userAgent: string;
    createdAt: Date;
}