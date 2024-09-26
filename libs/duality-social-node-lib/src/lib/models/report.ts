import { IReportDocument } from '@duality-social/duality-social-lib';
import { model } from 'mongoose';
import { ModelData } from '../schema-model-data.ts';

export const ReportModel = model<IReportDocument>(
  ModelData.Report.name,
  ModelData.Report.schema,
  ModelData.Report.collection,
);
