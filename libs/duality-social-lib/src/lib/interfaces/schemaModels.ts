import { Model } from 'mongoose';
import { IUsernameChange } from './usernameChange';
import { IVote } from './vote';
import { AdminUserDocument } from '../documents/adminUser';
import { EmailChangeDocument } from '../documents/emailChange';
import { UserDocument } from '../documents/user';
import { InvitationDocument } from '../documents/invitation';
import { LoginDocument } from '../documents/login';
import { PostDocument } from '../documents/post';
import { PostExpandDocument } from '../documents/postExpand';
import { PostImpressionDocument } from '../documents/postImpression';
import { PostViewpointDocument } from '../documents/postViewpoint';
import { PostViewpointReactionDocument } from '../documents/postViewpointReaction';
import { ProfileDocument } from '../documents/profile';
import { ReportDocument } from '../documents/report';
import { SudoLogDocument } from '../documents/sudoLog';
import { UsernameChangeDocument } from '../documents/usernameChange';
import { VoteDocument } from '../documents/vote';

export interface ISchemaModels {
    AdminUser: Model<AdminUserDocument>;
    EmailChange: Model<EmailChangeDocument>;
    Invitation: Model<InvitationDocument>;
    Login: Model<LoginDocument>;
    Post: Model<PostDocument>;
    PostExpand: Model<PostExpandDocument>;
    PostImpression: Model<PostImpressionDocument>;
    PostViewpoint: Model<PostViewpointDocument>;
    PostViewpointReaction: Model<PostViewpointReactionDocument>;
    Profile: Model<ProfileDocument>;
    Report: Model<ReportDocument>;
    SudoLog: Model<SudoLogDocument>;
    User: Model<UserDocument>;
    UsernameChange: Model<UsernameChangeDocument>;
    Vote: Model<VoteDocument>;
}