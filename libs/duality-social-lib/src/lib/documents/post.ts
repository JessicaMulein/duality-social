import { Document, ObjectId } from "mongoose";
import { IPost } from "../interfaces/post";

export interface PostDocument extends IPost, Document<ObjectId, any, any> {};