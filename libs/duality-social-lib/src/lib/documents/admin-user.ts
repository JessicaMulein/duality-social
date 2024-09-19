import { Document, Types } from "mongoose";
import { IAdminUser } from "../interfaces/admin-user.ts";

export interface IAdminUserDocument extends IAdminUser, Document<Types.ObjectId, any, any> {};