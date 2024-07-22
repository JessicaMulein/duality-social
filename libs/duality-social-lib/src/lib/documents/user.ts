import { Document, ObjectId } from "mongoose";
import { IUser } from "../interfaces/user";

export interface UserDocument extends IUser, Document<ObjectId, any, any> {};