import { IHasId } from '../has-id';
import { IReport } from '../models/report';

export interface IReportObject extends IReport, IHasId {}
