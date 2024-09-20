import { Document, Types } from "mongoose";
import { IPostViewpoint } from "../interfaces/post-viewpoint.ts";

export interface IPostViewpointDocument extends IPostViewpoint, Document<Types.ObjectId, any, any> {};