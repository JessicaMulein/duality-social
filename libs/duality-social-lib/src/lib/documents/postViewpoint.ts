import { Document, ObjectId } from "mongoose";
import { IPostViewpoint } from "../interfaces/postViewpoint";

export interface PostViewpointDocument extends IPostViewpoint, Document<ObjectId, any, any> {};