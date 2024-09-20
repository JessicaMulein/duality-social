import { Document, Types } from "mongoose";
import { IUser } from "../interfaces/user.ts";

export interface IUserDocument extends IUser, Document<Types.ObjectId, any, any> {};