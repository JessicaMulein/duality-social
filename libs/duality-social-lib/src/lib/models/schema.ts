import { Model, Schema } from 'mongoose';
import { IAdminUser } from '../interfaces/adminUser';
import { IInvitation } from '../interfaces/invitation';
import { ILogin } from '../interfaces/login';
import { IPost } from '../interfaces/post';
import { IPostExpand } from '../interfaces/postExpand';
import { IPostImpression } from '../interfaces/postImpression';
import { IPostViewpoint } from '../interfaces/postViewpoint';
import { IProfile } from '../interfaces/profile';
import { IReport } from '../interfaces/report';
import { ISudoLog } from '../interfaces/sudoLog';
import { IUser } from '../interfaces/user';
import { IUserNameChange } from '../interfaces/userNameChange';
import { IViewpointReaction } from '../interfaces/viewpointReaction';
import { AdminUserSchema } from '../schemas/adminUser';
import { InvitationSchema } from '../schemas/invitation';
import { LoginSchema } from '../schemas/login';
import { PostSchema } from '../schemas/post';
import { PostExpandSchema } from '../schemas/postExpand';
import { PostImpressionSchema } from '../schemas/postImpression';
import { PostViewpointSchema } from '../schemas/postViewpoint';
import { ProfileSchema } from '../schemas/profile';
import { ReportSchema } from '../schemas/report';
import { SudoLogSchema } from '../schemas/sudoLog';
import { UserSchema } from '../schemas/user';
import { UserNameChangeSchema } from '../schemas/userNameChange';
import { ViewpointReactionSchema } from '../schemas/viewpointReaction';
import { BaseModelCache } from './baseModelCache';
import { IUserMeta } from '../interfaces/userMeta';
import { UserMetaSchema } from '../schemas/userMeta';
import { registerModel } from '../db_functions';
import { IModelData } from '../interfaces/modelData';

export const ModelData: { [key: string]: IModelData } = {
  AdminUser: {
    name: 'AdminUser',
    description: 'An admin user in the system.',
    apiName: 'admin-users',
    pluralName: 'AdminUsers',
    schema: AdminUserSchema,
  },
  Invitation: {
    name: 'Invitation',
    description: 'An invitation to join the system.',
    apiName: 'invitations',
    pluralName: 'Invitations',
    schema: InvitationSchema,
  },
  Login: {
    name: 'Login',
    description: 'A login to the system.',
    apiName: 'logins',
    pluralName: 'Logins',
    schema: LoginSchema,
  },
  Post: {
    name: 'Post',
    description: 'A post in the system containing two viewpoints.',
    apiName: 'posts',
    pluralName: 'Posts',
    schema: PostSchema,
  },
  PostExpand: {
    name: 'PostExpand',
    description: 'A post expand event.',
    apiName: 'post-expands',
    pluralName: 'PostExpands',
    schema: PostExpandSchema,
  },
  PostImpression: {
    name: 'PostImpression',
    description: 'A post impression event.',
    apiName: 'post-impressions',
    pluralName: 'PostImpressions',
    schema: PostImpressionSchema,
  },
  PostViewpoint: {
    name: 'PostViewpoint',
    description: 'A post viewpoint.',
    apiName: 'post-viewpoints',
    pluralName: 'PostViewpoints',
    schema: PostViewpointSchema,
  },
  Profile: {
    name: 'Profile',
    description: 'A user profile.',
    apiName: 'profiles',
    pluralName: 'Profiles',
    schema: ProfileSchema,
  },
  Report: {
    name: 'Report',
    description: 'A report of a post.',
    apiName: 'reports',
    pluralName: 'Reports',
    schema: ReportSchema,
  },
  SudoLog: {
    name: 'SudoLog',
    description: 'A log of sudo events.',
    apiName: 'sudo-logs',
    pluralName: 'SudoLogs',
    schema: SudoLogSchema,
  },
  User: {
    name: 'User',
    description: 'A user in the system.',
    apiName: 'users',
    pluralName: 'Users',
    schema: UserSchema,
  },
  UserMeta: {
    name: 'UserMeta',
    description: 'Metadata for a user in the system.',
    apiName: 'user-meta',
    pluralName: 'UserMetas',
    schema: UserMetaSchema,
  },
  UserNameChange: {
    name: 'UsernameChange',
    description: 'A username change event.',
    apiName: 'username-change',
    pluralName: 'UsernameChanges',
    schema: UserNameChangeSchema,
  },
  ViewpointReaction: {
    name: 'ViewpointReaction',
    description: 'A reaction to a viewpoint.',
    apiName: 'viewpoint-reaction',
    pluralName: 'ViewpointReactions',
    schema: ViewpointReactionSchema,
  },
};
export type ModelNames = keyof typeof ModelData;

export const MongooseSchemas: { [key: string]: Schema } = {
  AdminUsers: AdminUserSchema,
  Invitations: InvitationSchema,
  Logins: LoginSchema,
  Posts: PostSchema,
  PostExpands: PostExpandSchema,
  PostImpressions: PostImpressionSchema,
  PostViewpoints: PostViewpointSchema,
  Profiles: ProfileSchema,
  Reports: ReportSchema,
  SudoLogs: SudoLogSchema,
  Users: UserSchema,
  UserMetas: UserMetaSchema,
  UserNameChanges: UserNameChangeSchema,
  ViewpointReactions: ViewpointReactionSchema,
};

export const MongooseModelSchemaNames: { [key: string]: string } = {
  AdminUser: ModelData.AdminUser.name,
  Invitation: ModelData.Invitation.name,
  Login: ModelData.Login.name,
  Post: ModelData.Post.name,
  PostExpand: ModelData.PostExpand.name,
  PostImpression: ModelData.Impression.name,
  PostViewpoint: ModelData.PostViewpoint.name,
  Profile: ModelData.Profile.name,
  Report: ModelData.Report.name,
  SudoLog: ModelData.SudoLog.name,
  User: ModelData.User.name,
  UserMeta: ModelData.UserMeta.name,
  UserNameChange: ModelData.UserNameChange.name,
  ViewpointReaction: ModelData.ViewpointReaction.name,
};

export const MongooseCollectionNames: { [key: string]: string } = {
  AdminUsers: ModelData.AdminUser.apiName,
  Invitations: ModelData.invitations.apiName,
  Logins: ModelData.logins.apiName,
  Posts: ModelData.posts.apiName,
  PostExpands: ModelData.postExpands.apiName,
  PostImpressions: ModelData.impressions.apiName,
  PostViewpoints: ModelData.postViewpoints.apiName,
  Profiles: ModelData.profiles.apiName,
  Reports: ModelData.reports.apiName,
  SudoLogs: ModelData.sudoLogs.apiName,
  Users: ModelData.users.apiName,
  UserMetas: ModelData.userMetas.apiName,
  UserNameChanges: ModelData.userNameChanges.apiName,
  ViewpointReactions: ModelData.viewpointReactions.apiName,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MongooseModels: { [key: string]: Model<any> } = {
  AdminUser: registerModel<IAdminUser>(ModelData.AdminUser),
  Invitation: registerModel<IInvitation>(ModelData.Invitation),
  Login: registerModel<ILogin>(ModelData.Login),
  Post: registerModel<IPost>(ModelData.Post),
  PostExpand: registerModel<IPostExpand>(ModelData.PostExpand),
  PostImpression: registerModel<IPostImpression>(ModelData.PostImpression),
  PostViewpoint: registerModel<IPostViewpoint>(ModelData.PostViewpoint),
  Profile: registerModel<IProfile>(ModelData.Profile),
  Report: registerModel<IReport>(ModelData.Report),
  SudoLog: registerModel<ISudoLog>(ModelData.SudoLog),
  User: registerModel<IUser>(ModelData.User),
  UserNameChange: registerModel<IUserNameChange>(ModelData.UserNameChange),
  ViewpointReaction: registerModel<IViewpointReaction>(
    ModelData.ViewpointReaction
  ),
};

export const BaseModelCaches = {
  AdminUsers: BaseModelCache.make<IAdminUser>(
    ModelData.AdminUser,
    MongooseModels.AdminUser
  ),
  Invitations: BaseModelCache.make<IInvitation>(
    ModelData.Invitation,
    MongooseModels.Invitation
  ),
  Logins: BaseModelCache.make<ILogin>(ModelData.Login, MongooseModels.Login),
  Posts: BaseModelCache.make<IPost>(ModelData.Post, MongooseModels.Post),
  PostExpands: BaseModelCache.make<IPostExpand>(
    ModelData.PostExpand,
    MongooseModels.PostExpand
  ),
  PostImpressions: BaseModelCache.make<IPostImpression>(
    ModelData.PostImpression,
    MongooseModels.PostImpression
  ),
  PostViewpoints: BaseModelCache.make<IPostViewpoint>(
    ModelData.PostViewpoint,
    MongooseModels.PostViewpoint
  ),
  Profiles: BaseModelCache.make<IProfile>(
    ModelData.Profile,
    MongooseModels.Profile
  ),
  Reports: BaseModelCache.make<IReport>(
    ModelData.Report,
    MongooseModels.Report
  ),
  SudoLogs: BaseModelCache.make<ISudoLog>(
    ModelData.SudoLog,
    MongooseModels.SudoLog
  ),
  Users: BaseModelCache.make<IUser>(ModelData.User, MongooseModels.User),
  UserMetas: BaseModelCache.make<IUserMeta>(
    ModelData.UserMeta,
    MongooseModels.UserMeta
  ),
  UserNameChanges: BaseModelCache.make<IUserNameChange>(
    ModelData.UserNameChange,
    MongooseModels.UserNameChange
  ),
  ViewpointReactions: BaseModelCache.make<IViewpointReaction>(
    ModelData.ViewpointReaction,
    MongooseModels.ViewpointReaction
  ),
};
