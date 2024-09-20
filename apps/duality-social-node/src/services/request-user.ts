import {
  IRequestUser,
  IRoleDocument,
  IUserDocument,
} from '@duality-social/duality-social-lib';

export class RequestUserService {
  /**
   * Given a user document and an array of role documents, create the IRequestUser
   * @param userDoc
   * @param roles
   * @returns
   */
  public static makeRequestUser(
    userDoc: IUserDocument,
    roles: IRoleDocument[],
  ): IRequestUser {
    if (!userDoc._id) {
      throw new Error('User document is missing _id');
    }
    const requestUser: IRequestUser = {
      id: userDoc._id.toString(),
      roles: roles,
      email: userDoc.email,
      username: userDoc.username,
      languages: userDoc.languages,
      humanityType: userDoc.humanityType,
      timezone: userDoc.timezone,
      lastLogin: userDoc.lastLogin,
      emailVerified: userDoc.emailVerified,
    };
    return requestUser;
  }
}
