import { Document, ObjectId } from "mongoose";
import { ISudoLog } from "../interfaces/sudoLog";

export interface SudoLogDocument extends ISudoLog, Document<ObjectId, any, any> {};