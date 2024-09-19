import { Document, Types } from "mongoose";
import { IReport } from "../interfaces/report.ts";

export interface IReportDocument extends IReport, Document<Types.ObjectId, any, any> {};