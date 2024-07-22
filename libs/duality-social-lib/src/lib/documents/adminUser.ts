import { Document, ObjectId } from "mongoose";
import { IAdminUser } from "../interfaces/adminUser";

export interface AdminUserDocument extends IAdminUser, Document<ObjectId, any, any> {};