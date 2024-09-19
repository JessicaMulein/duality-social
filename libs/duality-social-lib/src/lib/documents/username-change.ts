import { Document, Types } from "mongoose";
import { IUsernameChange } from "../interfaces/username-change.ts";

export interface IUsernameChangeDocument extends IUsernameChange, Document<Types.ObjectId, any, any> {};