import { Document, Types } from "mongoose";
import { IPostImpression } from "../interfaces/post-impression.ts";

export interface IPostImpressionDocument extends IPostImpression, Document<Types.ObjectId, any, any> {};