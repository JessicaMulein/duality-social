import { Types } from 'mongoose';
import { ReportTypeEnum } from '../../enumerations/report-type.ts';

export interface IReport {
  postId: Types.ObjectId;
  viewpointId: Types.ObjectId;
  reportType: ReportTypeEnum;
  notes: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}
