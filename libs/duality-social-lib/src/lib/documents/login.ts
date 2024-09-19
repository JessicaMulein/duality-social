import { Document, Types } from "mongoose";
import { ILogin } from "../interfaces/login.ts";

export interface ILoginDocument extends ILogin, Document<Types.ObjectId, any, any> {};