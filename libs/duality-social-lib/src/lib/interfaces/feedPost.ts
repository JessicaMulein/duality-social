import { IFeedViewpoint } from "./feedViewpoint";

export interface IFeedPost {
  _id: string;
  content: string;
  createdBy: {
    _id: string;
    displayName: string;
    avatarUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  replies: IFeedPost[];
  inputViewpoint: IFeedViewpoint;
  aiViewpoint: IFeedViewpoint;
}