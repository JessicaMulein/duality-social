import { ReportTypeEnum } from "../enumerations/reportType";
import { ObjectId } from "mongoose";

export interface IReport {
    postId: ObjectId;
    viewpointId: ObjectId;
    reportType: ReportTypeEnum;
    notes: string;
    createdBy: ObjectId;
    createdAt: Date;
}