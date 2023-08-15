import { Schema } from 'mongoose';
import { ReportTypeEnum } from '../enumerations/reportType';
import { IReport } from '../interfaces/report';
import ModelName from '../enumerations/modelName';

export const ReportSchema = new Schema<IReport>({
  /**
   * The id of the post being reported.
   * This is the id of the post, not the viewpoint.
   */
  postId: {
    type: Schema.Types.ObjectId,
    ref: ModelName.Post,
    required: true,
    immutable: true,
  },
  /**
   * The id of the viewpoint being reported.
   * This is the id of the viewpoint, not the post.
   * This is the viewpoint that the user is reporting.
   */
  viewpointId: {
    type: Schema.Types.ObjectId,
    ref: ModelName.PostViewpoint,
    required: true,
    immutable: true,
  },
  /**
   * The type of report.
   * This is the type of report that the user is making, eg 'spam', 'harassment', 'other'.
   */
  reportType: {
    type: String,
    enum: ReportTypeEnum,
    required: true,
    immutable: true,
  },
  /**
   * The reason for the report, or other details.
   */
  notes: { type: String, optional: true, immutable: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: ModelName.User,
    required: true,
    immutable: true,
  },
  createdAt: { type: Date, default: Date.now, required: true, immutable: true },
});