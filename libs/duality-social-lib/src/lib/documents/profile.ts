import { Document, ObjectId } from "mongoose";
import { IProfile } from "../interfaces/profile";

export interface ProfileDocument extends IProfile, Document<ObjectId, any, any> {};