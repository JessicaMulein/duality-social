// file: schema.ts
// description: This file contains the schema for all models in the system
// ---------------------------------------------------------------------------------------------
import { ModelName } from './enumerations/modelName';
import { ISudoLog } from './interfaces/sudoLog';
import { IUsernameChange } from './interfaces/usernameChange';
import { BaseModel } from './models/baseModel';
import { ISchemaModels } from './interfaces/schemaModels';
import { ModelData} from './schemaModelData';
import { IPostViewpointHumanity } from './interfaces/postViewpointHumanity';
import { UserDocument } from './documents/user';
import { AdminUserDocument } from './documents/adminUser';
import { EmailChangeDocument } from './documents/emailChange';
import { InvitationDocument } from './documents/invitation';
import { LoginDocument } from './documents/login';
import { PostDocument } from './documents/post';
import { PostExpandDocument } from './documents/postExpand';
import { PostImpressionDocument } from './documents/postImpression';
import { PostViewpointDocument } from './documents/postViewpoint';
import { PostViewpointReactionDocument } from './documents/postViewpointReaction';
import { ProfileDocument } from './documents/profile';
import { ReportDocument } from './documents/report';
import { SudoLogDocument } from './documents/sudoLog';
import { UsernameChangeDocument } from './documents/usernameChange';
import { PostViewpointHumanityDocument } from './documents/postViewpointHumanity';

export const SchemaModels: ISchemaModels = {
  AdminUser: BaseModel.create<AdminUserDocument>(ModelData[ModelName.AdminUser]).Model,
  EmailChange: BaseModel.create<EmailChangeDocument>(ModelData[ModelName.EmailChange]).Model,
  Invitation: BaseModel.create<InvitationDocument>(ModelData[ModelName.Invitation]).Model,
  Login: BaseModel.create<LoginDocument>(ModelData[ModelName.Login]).Model,
  Post: BaseModel.create<PostDocument>(ModelData[ModelName.Post]).Model,
  PostExpand: BaseModel.create<PostExpandDocument>(ModelData[ModelName.PostExpand]).Model,
  PostImpression: BaseModel.create<PostImpressionDocument>(ModelData[ModelName.PostImpression]).Model,
  PostViewpoint: BaseModel.create<PostViewpointDocument>(ModelData[ModelName.PostViewpoint]).Model,
  PostViewpointReaction: BaseModel.create<PostViewpointReactionDocument>(
    ModelData[ModelName.PostViewpointReaction]
  ).Model,
  PostViewpointHumanity: BaseModel.create<PostViewpointHumanityDocument>(ModelData[ModelName.PostViewpointHumanity]).Model,
  Profile: BaseModel.create<ProfileDocument>(ModelData[ModelName.Profile]).Model,
  Report: BaseModel.create<ReportDocument>(ModelData[ModelName.Report]).Model,
  SudoLog: BaseModel.create<SudoLogDocument>(ModelData[ModelName.SudoLog]).Model,
  User: BaseModel.create<UserDocument>(ModelData[ModelName.User]).Model,
  UsernameChange: BaseModel.create<UsernameChangeDocument>(ModelData[ModelName.UsernameChange]).Model,
};