import { Document, ObjectId } from "mongoose";
import { IUsernameChange } from "../interfaces/usernameChange";

export interface UsernameChangeDocument extends IUsernameChange, Document<ObjectId, any, any> {};