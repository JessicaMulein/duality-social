import { Document, Types } from "mongoose";
import { IProfile } from "../interfaces/profile.ts";

export interface IProfileDocument extends IProfile, Document<Types.ObjectId, any, any> {};