import {
  IAdminUserDocument,
  IEmailTokenDocument,
  IInvitationDocument,
  ILoginDocument,
  IPostDocument,
  IPostExpandDocument,
  IPostImpressionDocument,
  IPostViewpointDocument,
  IPostViewpointHumanityDocument,
  IPostViewpointReactionDocument,
  IProfileDocument,
  IReportDocument,
  IRoleDocument,
  ISudoLogDocument,
  IUserDocument,
  IUsernameChangeDocument,
} from '@duality-social/duality-social-lib';
import { Model } from 'mongoose';

export interface ISchemaModels {
  AdminUser: Model<IAdminUserDocument>;
  EmailToken: Model<IEmailTokenDocument>;
  Invitation: Model<IInvitationDocument>;
  Login: Model<ILoginDocument>;
  Post: Model<IPostDocument>;
  PostExpand: Model<IPostExpandDocument>;
  PostImpression: Model<IPostImpressionDocument>;
  PostViewpoint: Model<IPostViewpointDocument>;
  PostViewpointReaction: Model<IPostViewpointReactionDocument>;
  PostViewpointHumanity: Model<IPostViewpointHumanityDocument>;
  Profile: Model<IProfileDocument>;
  Report: Model<IReportDocument>;
  Role: Model<IRoleDocument>;
  SudoLog: Model<ISudoLogDocument>;
  User: Model<IUserDocument>;
  UsernameChange: Model<IUsernameChangeDocument>;
}
