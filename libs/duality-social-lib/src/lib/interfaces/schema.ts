import { Schema } from "mongoose";

export interface ISchema {
    AdminUser: Schema;
    EmailChange: Schema;
    Invitation: Schema;
    Login: Schema;
    Post: Schema;
    PostExpand: Schema;
    PostImpression: Schema;
    PostViewpoint: Schema;
    PostViewpointReaction: Schema;
    Profile: Schema;
    Report: Schema;
    SudoLog: Schema;
    User: Schema;
    UserMeta: Schema;
    UsernameChange: Schema;
    Vote: Schema;
}