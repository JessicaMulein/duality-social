import { Document, ObjectId } from "mongoose";
import { IPostImpression } from "../interfaces/postImpression";

export interface PostImpressionDocument extends IPostImpression, Document<ObjectId, any, any> {};