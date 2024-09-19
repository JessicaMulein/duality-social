import { IRoleDocument, ITokenUser } from "@duality-social/duality-social-lib";

export interface ISignedToken {
    token: string,
    tokenUser: ITokenUser,
    roleNames: string[],
    roles: IRoleDocument[]
}