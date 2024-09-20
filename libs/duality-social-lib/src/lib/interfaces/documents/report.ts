import { Document, Types } from 'mongoose';
import { IReport } from '../models/report.ts';

export interface IReportDocument
  extends IReport,
    Document<Types.ObjectId, unknown, unknown> {}
