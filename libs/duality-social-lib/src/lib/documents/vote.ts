import { Document, ObjectId } from "mongoose";
import { IVote } from "../interfaces/vote";

export interface VoteDocument extends IVote, Document<ObjectId, any, any> {};