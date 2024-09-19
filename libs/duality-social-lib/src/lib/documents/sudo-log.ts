import { Document, Types } from "mongoose";
import { ISudoLog } from "../interfaces/sudo-log.ts";

export interface ISudoLogDocument extends ISudoLog, Document<Types.ObjectId, any, any> {};