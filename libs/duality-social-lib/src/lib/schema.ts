// file: schema.ts
// description: This file contains the schema for all models in the system
// ---------------------------------------------------------------------------------------------
import { Model, Schema } from 'mongoose';
import { ModelName } from './enumerations/modelName';
import { ModelNameCollection } from './enumerations/modelNameCollection';
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
import { AdminUserSchema } from './schemas/adminUser';
import { EmailChangeSchema } from './schemas/emailChange';
import { InvitationSchema } from './schemas/invitation';
import { LoginSchema } from './schemas/login';
import { PostSchema } from './schemas/post';
import { PostExpandSchema } from './schemas/postExpand';
import { PostImpressionSchema } from './schemas/postImpression';
import { PostViewpointSchema } from './schemas/postViewpoint';
import { ProfileSchema } from './schemas/profile';
import { ReportSchema } from './schemas/report';
import { SudoLogSchema } from './schemas/sudoLog';
import { UserSchema } from './schemas/user';
import { UsernameChangeSchema } from './schemas/usernameChange';
import { PostViewpointReactionSchema } from './schemas/postViewpointReaction';
import { VoteSchema } from './schemas/vote';
import { IUserMeta } from './interfaces/userMeta';
import { UserMetaSchema } from './schemas/userMeta';
import { IVote } from './interfaces/vote';
import { ISchema } from './interfaces/schema';
import { ISchemaModels } from './interfaces/schemaModels';
import { ISchemaModelData } from './interfaces/schemaModelData';
import { BaseModel } from './models/baseModel';

function modelNameCollectionToPath(modelNameCollection: ModelNameCollection): string {
  return `/${modelNameCollection as string}`;
}

/**
 * The schema for all models in the system.
 * This includes the name, description, plural name, and api name of each model.
 */
export const ModelData: ISchemaModelData = {
  AdminUser: {
    name: ModelName.AdminUser,
    description: 'An admin user in the system.',
    collection: ModelNameCollection.AdminUser,
    schema: AdminUserSchema,
    path: modelNameCollectionToPath(ModelNameCollection.AdminUser),
  },
  EmailChange: {
    name: ModelName.EmailChange,
    description: 'An email change event.',
    collection: ModelNameCollection.EmailChange,
    schema: EmailChangeSchema,
    path: modelNameCollectionToPath(ModelNameCollection.EmailChange),
  },
  Invitation: {
    name: ModelName.Invitation,
    description: 'An invitation to join the system.',
    collection: ModelNameCollection.Invitation,
    schema: InvitationSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Invitation),
  },
  Login: {
    name: ModelName.Login,
    description: 'A login to the system.',
    collection: ModelNameCollection.Login,
    schema: LoginSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Login),
  },
  Post: {
    name: ModelName.Post,
    description: 'A post in the system containing two viewpoints.',
    collection: ModelNameCollection.Post,
    schema: PostSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Post),
  },
  PostExpand: {
    name: ModelName.PostExpand,
    description: 'A post expand event.',
    collection: ModelNameCollection.PostExpand,
    schema: PostExpandSchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostExpand),
  },
  PostImpression: {
    name: ModelName.PostImpression,
    description: 'A post impression event.',
    collection: ModelNameCollection.PostImpression,
    schema: PostImpressionSchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostImpression),
  },
  PostViewpoint: {
    name: ModelName.PostViewpoint,
    description: 'A post viewpoint.',
    collection: ModelNameCollection.PostViewpoint,
    schema: PostViewpointSchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostViewpoint),
  },
  PostViewpointReaction: {
    name: ModelName.PostViewpointReaction,
    description: 'A reaction to a viewpoint.',
    collection: ModelNameCollection.PostViewpointReaction,
    schema: PostViewpointReactionSchema,
    path: modelNameCollectionToPath(ModelNameCollection.PostViewpointReaction),
  },
  Profile: {
    name: ModelName.Profile,
    description: 'A user profile.',
    collection: ModelNameCollection.Profile,
    schema: ProfileSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Profile),
  },
  Report: {
    name: ModelName.Report,
    description: 'A report of a post.',
    collection: ModelNameCollection.Report,
    schema: ReportSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Report),
  },
  SudoLog: {
    name: ModelName.SudoLog,
    description: 'A log of sudo events.',
    collection: ModelNameCollection.SudoLog,
    schema: SudoLogSchema,
    path: modelNameCollectionToPath(ModelNameCollection.SudoLog),
  },
  User: {
    name: ModelName.User,
    description: 'A user in the system.',
    collection: ModelNameCollection.User,
    schema: UserSchema,
    path: modelNameCollectionToPath(ModelNameCollection.User),
  },
  UserMeta: {
    name: ModelName.UserMeta,
    description: 'Metadata for a user in the system.',
    collection: ModelNameCollection.UserMeta,
    schema: UserMetaSchema,
    path: modelNameCollectionToPath(ModelNameCollection.UserMeta),
  },
  UsernameChange: {
    name: ModelName.UsernameChange,
    description: 'A username change event.',
    collection: ModelNameCollection.UsernameChange,
    schema: UsernameChangeSchema,
    path: modelNameCollectionToPath(ModelNameCollection.UsernameChange),
  },
  Vote: {
    name: ModelName.Vote,
    description: 'A vote on the humanity of a viewpoint.',
    collection: ModelNameCollection.Vote,
    schema: VoteSchema,
    path: modelNameCollectionToPath(ModelNameCollection.Vote),
  }
};

/**
 * A simple dictionary of schemas for all models in the system.
 */
export const MongooseSchemas: ISchema = {
  AdminUser: AdminUserSchema,
  EmailChange: EmailChangeSchema,
  Invitation: InvitationSchema,
  Login: LoginSchema,
  Post: PostSchema,
  PostExpand: PostExpandSchema,
  PostImpression: PostImpressionSchema,
  PostViewpoint: PostViewpointSchema,
  PostViewpointReaction: PostViewpointReactionSchema,
  Profile: ProfileSchema,
  Report: ReportSchema,
  SudoLog: SudoLogSchema,
  User: UserSchema,
  UserMeta: UserMetaSchema,
  UsernameChange: UsernameChangeSchema,
  Vote: VoteSchema,
};

/**
 * A simple dictionary of models for all models in the system.
 * This causes all of the models to register themselves with mongoose.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MongooseModels: ISchemaModels = {
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
