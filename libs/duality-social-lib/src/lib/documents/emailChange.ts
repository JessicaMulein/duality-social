import { Document, ObjectId } from "mongoose";
import { IEmailChange } from "../interfaces/emailChange";

export interface EmailChangeDocument extends IEmailChange, Document<ObjectId, any, any> {};