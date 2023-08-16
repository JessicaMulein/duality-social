// file: schema.ts
// description: This file contains the schema for all models in the system
// ---------------------------------------------------------------------------------------------
import { ModelName } from './enumerations/modelName';
import { IAdminUser } from './interfaces/adminUser';
import { IEmailChange } from './interfaces/emailChange';
import { IInvitation } from './interfaces/invitation';
import { ILogin } from './interfaces/login';
import { IPost } from './interfaces/post';
import { IPostExpand } from './interfaces/postExpand';
import { IPostImpression } from './interfaces/postImpression';
import { IPostViewpoint } from './interfaces/postViewpoint';
import { IProfile } from './interfaces/profile';
import { IReport } from './interfaces/report';
import { ISudoLog } from './interfaces/sudoLog';
import { IUser } from './interfaces/user';
import { IUsernameChange } from './interfaces/usernameChange';
import { IPostViewpointReaction } from './interfaces/postViewpointReaction';
import { BaseModel } from './models/baseModel';
import { ISchemaModels } from './interfaces/schemaModels';
import { ModelData} from './schemaModelData';
import { IUserMeta } from './interfaces/userMeta';
import { IVote } from './interfaces/vote';

export const SchemaModels: ISchemaModels = {
  AdminUser: BaseModel.create<IAdminUser>(ModelData[ModelName.AdminUser]).Model,
  EmailChange: BaseModel.create<IEmailChange>(ModelData[ModelName.EmailChange]).Model,
  Invitation: BaseModel.create<IInvitation>(ModelData[ModelName.Invitation]).Model,
  Login: BaseModel.create<ILogin>(ModelData[ModelName.Login]).Model,
  Post: BaseModel.create<IPost>(ModelData[ModelName.Post]).Model,
  PostExpand: BaseModel.create<IPostExpand>(ModelData[ModelName.PostExpand]).Model,
  PostImpression: BaseModel.create<IPostImpression>(ModelData[ModelName.PostImpression]).Model,
  PostViewpoint: BaseModel.create<IPostViewpoint>(ModelData[ModelName.PostViewpoint]).Model,
  PostViewpointReaction: BaseModel.create<IPostViewpointReaction>(
    ModelData[ModelName.PostViewpointReaction]
  ).Model,
  Profile: BaseModel.create<IProfile>(ModelData[ModelName.Profile]).Model,
  Report: BaseModel.create<IReport>(ModelData[ModelName.Report]).Model,
  SudoLog: BaseModel.create<ISudoLog>(ModelData[ModelName.SudoLog]).Model,
  User: BaseModel.create<IUser>(ModelData[ModelName.User]).Model,
  UserMeta: BaseModel.create<IUserMeta>(ModelData[ModelName.UserMeta]).Model,
  UsernameChange: BaseModel.create<IUsernameChange>(ModelData[ModelName.UsernameChange]).Model,
  Vote: BaseModel.create<IVote>(ModelData[ModelName.Vote]).Model,
};