import { Document, Types } from "mongoose";
import { IPost } from "../interfaces/post.ts";

export interface IPostDocument extends IPost, Document<Types.ObjectId, any, any> {};