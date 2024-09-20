import { Document, Types } from "mongoose";
import { IPostExpand } from "../interfaces/post-expand.ts";

export interface IPostExpandDocument extends IPostExpand, Document<Types.ObjectId, any, any> {};