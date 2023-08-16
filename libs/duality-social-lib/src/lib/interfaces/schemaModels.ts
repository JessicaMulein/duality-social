import { Model } from 'mongoose';
import { IAdminUser } from './adminUser';
import { IEmailChange } from './emailChange';
import { IInvitation } from './invitation';
import { ILogin } from './login';
import { IPost } from './post';
import { IPostExpand } from './postExpand';
import { IPostImpression } from './postImpression';
import { IPostViewpoint } from './postViewpoint';
import { IPostViewpointReaction } from './postViewpointReaction';
import { IProfile } from './profile';
import { IReport } from './report';
import { ISudoLog } from './sudoLog';
import { IUser } from './user';
import { IUserMeta } from './userMeta';
import { IUsernameChange } from './usernameChange';
import { IVote } from './vote';

export interface ISchemaModels {
    AdminUser: Model<IAdminUser>;
    EmailChange: Model<IEmailChange>;
    Invitation: Model<IInvitation>;
    Login: Model<ILogin>;
    Post: Model<IPost>;
    PostExpand: Model<IPostExpand>;
    PostImpression: Model<IPostImpression>;
    PostViewpoint: Model<IPostViewpoint>;
    PostViewpointReaction: Model<IPostViewpointReaction>;
    Profile: Model<IProfile>;
    Report: Model<IReport>;
    SudoLog: Model<ISudoLog>;
    User: Model<IUser>;
    UserMeta: Model<IUserMeta>;
    UsernameChange: Model<IUsernameChange>;
    Vote: Model<IVote>;
}