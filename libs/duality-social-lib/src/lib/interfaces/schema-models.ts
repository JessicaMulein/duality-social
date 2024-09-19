import { Model } from 'mongoose';
import { IAdminUserDocument } from '../documents/admin-user.ts';
import { IUserDocument } from '../documents/user.ts';
import { IInvitationDocument } from '../documents/invitation.ts';
import { ILoginDocument } from '../documents/login.ts';
import { IPostDocument } from '../documents/post.ts';
import { IPostExpandDocument } from '../documents/post-expand.ts';
import { IPostImpressionDocument } from '../documents/post-impression.ts';
import { IPostViewpointDocument } from '../documents/post-viewpoint.ts';
import { IPostViewpointReactionDocument } from '../documents/post-viewpoint-reaction.ts';
import { IProfileDocument } from '../documents/profile.ts';
import { IReportDocument } from '../documents/report.ts';
import { ISudoLogDocument } from '../documents/sudo-log.ts';
import { IUsernameChangeDocument } from '../documents/username-change.ts';
import { IPostViewpointHumanityDocument } from '../documents/post-viewpoint-humanity.ts';
import { IRoleDocument } from '../documents/role.ts';
import { IEmailTokenDocument } from '../documents/email-token.ts';

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