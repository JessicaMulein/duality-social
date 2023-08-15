import { ReportTypeEnum } from "../enumerations/reportType";
import { IPost } from "./post";
import { IPostViewpoint } from "./postViewpoint";
import { IUser } from "./user";
import { IHasID } from "./hasId";

export interface IReport extends IHasID {
    postId: IPost['_id'];
    viewpointId: IPostViewpoint['_id'];
    reportType: ReportTypeEnum;
    notes: string;
    createdBy: IUser['_id'];
    createdAt: Date;
}