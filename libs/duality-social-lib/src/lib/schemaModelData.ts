import { ModelName } from './enumerations/modelName';
import { ModelNameCollection } from './enumerations/modelNameCollection';
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
import { UserMetaSchema } from './schemas/userMeta';
import { ISchemaModelData } from './interfaces/schemaModelData';

function modelNameCollectionToPath(
  modelNameCollection: ModelNameCollection
): string {
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
  },
};
