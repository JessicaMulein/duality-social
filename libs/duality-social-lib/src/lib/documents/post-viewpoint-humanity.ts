import { Document, Types } from "mongoose";
import { IPostViewpointHumanity } from "../interfaces/post-viewpoint-humanity.ts";

export interface IPostViewpointHumanityDocument extends IPostViewpointHumanity, Document<Types.ObjectId, any, any> {};