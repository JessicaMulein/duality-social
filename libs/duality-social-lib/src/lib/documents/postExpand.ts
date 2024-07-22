import { Document, ObjectId } from "mongoose";
import { IPostExpand } from "../interfaces/postExpand";

export interface PostExpandDocument extends IPostExpand, Document<ObjectId, any, any> {};