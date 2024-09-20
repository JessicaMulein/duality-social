import { Document, Types } from "mongoose";
import { IRole } from "../interfaces/role.ts";

/**
 * Composite interface for role collection documents
 */
export interface IRoleDocument extends IRole, Document<Types.ObjectId, any, any> {}