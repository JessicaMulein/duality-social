import { Document, Types } from "mongoose";
import { IPostViewpointReaction } from "../interfaces/post-viewpoint-reaction.ts";

export interface IPostViewpointReactionDocument extends IPostViewpointReaction, Document<Types.ObjectId, any, any> {};