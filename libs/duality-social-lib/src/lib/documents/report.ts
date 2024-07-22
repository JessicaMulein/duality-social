import { Document, ObjectId } from "mongoose";
import { IReport } from "../interfaces/report";

export interface ReportDocument extends IReport, Document<ObjectId, any, any> {};