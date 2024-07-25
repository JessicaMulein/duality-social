import { Document, ObjectId } from "mongoose";
import { IPostViewpointHumanity } from "../interfaces/postViewpointHumanity";

export interface PostViewpointHumanityDocument extends IPostViewpointHumanity, Document<ObjectId, any, any> {};