import { Document, ObjectId } from "mongoose";
import { IPostViewpointReaction } from "../interfaces/postViewpointReaction";

export interface PostViewpointReactionDocument extends IPostViewpointReaction, Document<ObjectId, any, any> {};