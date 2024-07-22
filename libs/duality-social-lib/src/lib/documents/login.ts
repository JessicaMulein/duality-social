import { Document, ObjectId } from "mongoose";
import { ILogin } from "../interfaces/login";

export interface LoginDocument extends ILogin, Document<ObjectId, any, any> {};