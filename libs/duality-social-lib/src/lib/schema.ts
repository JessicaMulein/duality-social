// file: schema.ts
// description: This file contains the schema for all models in the system
// see also: ./db_functions.ts
// ---------------------------------------------------------------------------------------------
import { Model, Schema } from 'mongoose';
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
import { IViewpointReaction } from './interfaces/viewpointReaction';
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
import { ViewpointReactionSchema } from './schemas/viewpointReaction';
import { VoteSchema } from './schemas/vote';
import { IUserMeta } from './interfaces/userMeta';
import { UserMetaSchema } from './schemas/userMeta';
import { registerModel } from './db_functions';
import { IModelData } from './interfaces/modelData';
import { IVote } from './interfaces/vote';

/**
 * The schema for all models in the system.
 * This includes the name, description, plural name, and api name of each model.
 */
export const ModelData: { [key: string]: IModelData } = {
  AdminUser: {
    name: ModelName.AdminUser,
    description: 'An admin user in the system.',
    apiName: 'admin-users',
    pluralName: 'admin users',
    schema: AdminUserSchema,
    path: '/admin-users',
  },
  EmailChange: {
    name: ModelName.EmailChange,
    description: 'An email change event.',
    apiName: 'email-changes',
    pluralName: 'email changes',
    schema: EmailChangeSchema,
    path: '/email-changes',
  },
  Invitation: {
    name: ModelName.Invitation,
    description: 'An invitation to join the system.',
    apiName: 'invitations',
    pluralName: 'invitations',
    schema: InvitationSchema,
    path: '/invitations',
  },
  Login: {
    name: ModelName.Login,
    description: 'A login to the system.',
    apiName: 'logins',
    pluralName: 'logins',
    schema: LoginSchema,
    path: '/logins',
  },
  Post: {
    name: ModelName.Post,
    description: 'A post in the system containing two viewpoints.',
    apiName: 'posts',
    pluralName: 'posts',
    schema: PostSchema,
    path: '/posts',
  },
  PostExpand: {
    name: ModelName.PostExpand,
    description: 'A post expand event.',
    apiName: 'post-expands',
    pluralName: 'post expands',
    schema: PostExpandSchema,
    path: '/post-expands',
  },
  PostImpression: {
    name: ModelName.PostImpression,
    description: 'A post impression event.',
    apiName: 'post-impressions',
    pluralName: 'post impressions',
    schema: PostImpressionSchema,
    path: '/post-impressions',
  },
  PostViewpoint: {
    name: ModelName.PostViewpoint,
    description: 'A post viewpoint.',
    apiName: 'post-viewpoints',
    pluralName: 'post viewpoints',
    schema: PostViewpointSchema,
    path: '/post-viewpoints',
  },
  Profile: {
    name: ModelName.Profile,
    description: 'A user profile.',
    apiName: 'profiles',
    pluralName: 'profiles',
    schema: ProfileSchema,
    path: '/profiles',
  },
  Report: {
    name: ModelName.Report,
    description: 'A report of a post.',
    apiName: 'reports',
    pluralName: 'reports',
    schema: ReportSchema,
    path: '/reports',
  },
  SudoLog: {
    name: ModelName.SudoLog,
    description: 'A log of sudo events.',
    apiName: 'sudo-logs',
    pluralName: 'sudo logs',
    schema: SudoLogSchema,
    path: '/sudo-logs',
  },
  User: {
    name: ModelName.User,
    description: 'A user in the system.',
    apiName: 'users',
    pluralName: 'users',
    schema: UserSchema,
    path: '/users',
  },
  UserMeta: {
    name: ModelName.UserMeta,
    description: 'Metadata for a user in the system.',
    apiName: 'user-metas',
    pluralName: 'user metas',
    schema: UserMetaSchema,
    path: '/user-metas',
  },
  UsernameChange: {
    name: ModelName.UsernameChange,
    description: 'A username change event.',
    apiName: 'username-changes',
    pluralName: 'username changes',
    schema: UsernameChangeSchema,
    path: '/username-changes',
  },
  ViewpointReaction: {
    name: ModelName.ViewpointReaction,
    description: 'A reaction to a viewpoint.',
    apiName: 'viewpoint-reaction',
    pluralName: 'viewpoint reactions',
    schema: ViewpointReactionSchema,
    path: '/viewpoint-reactions',
  },
  Vote: {
    name: ModelName.Vote,
    description: 'A vote on the humanity of a viewpoint.',
    apiName: 'votes',
    pluralName: 'votes',
    schema: VoteSchema,
    path: '/votes',
  }
};

/**
 * The names of all models in the system.
 */
export type ModelNames = keyof typeof ModelData;

/**
 * A simple dictionary of schemas for all models in the system.
 */
export const MongooseSchemas: { [key: ModelNames]: Schema } = {
  AdminUser: AdminUserSchema,
  EmailChange: EmailChangeSchema,
  Invitation: InvitationSchema,
  Login: LoginSchema,
  Post: PostSchema,
  PostExpand: PostExpandSchema,
  PostImpression: PostImpressionSchema,
  PostViewpoint: PostViewpointSchema,
  Profile: ProfileSchema,
  Report: ReportSchema,
  SudoLog: SudoLogSchema,
  User: UserSchema,
  UserMeta: UserMetaSchema,
  UsernameChange: UsernameChangeSchema,
  ViewpointReaction: ViewpointReactionSchema,
  Vote: VoteSchema,
};

/**
 * A simple dictionary of models for all models in the system.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MongooseModels: { [key: ModelNames]: Model<any> } = {
  AdminUser: registerModel<IAdminUser>(ModelData['AdminUser']),
  EmailChange: registerModel<IEmailChange>(ModelData['EmailChange']),
  Invitation: registerModel<IInvitation>(ModelData['Invitation']),
  Login: registerModel<ILogin>(ModelData['Login']),
  Post: registerModel<IPost>(ModelData['Post']),
  PostExpand: registerModel<IPostExpand>(ModelData['PostExpand']),
  PostImpression: registerModel<IPostImpression>(ModelData['PostImpression']),
  PostViewpoint: registerModel<IPostViewpoint>(ModelData['PostViewpoint']),
  Profile: registerModel<IProfile>(ModelData['Profile']),
  Report: registerModel<IReport>(ModelData['Report']),
  SudoLog: registerModel<ISudoLog>(ModelData['SudoLog']),
  User: registerModel<IUser>(ModelData['User']),
  UserMeta: registerModel<IUserMeta>(ModelData['UserMeta']),
  UsernameChange: registerModel<IUsernameChange>(ModelData['UsernameChange']),
  ViewpointReaction: registerModel<IViewpointReaction>(
    ModelData['ViewpointReaction']
  ),
  Vote: registerModel<IVote>(ModelData['Vote']),
};
