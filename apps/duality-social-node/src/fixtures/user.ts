import { AccountStatusTypeEnum, AppConstants, HumanityTypeEnum, IUser, IUserDocument, LockTypeEnum } from "@duality-social/duality-social-lib";
import { ObjectId, Types } from "mongoose";
import { hash } from "bcrypt";

export function makeUser(): IUser {
    const creatorId = new Types.ObjectId() as unknown as ObjectId;
    const createdAt = new Date();
    return {
        username: 'testuser',
        languages: ['en'],
        lockStatus: LockTypeEnum.Unlocked,
        shadowBan: false,
        userHidden: false,
        accountStatusType: AccountStatusTypeEnum.Active,
        humanityType: HumanityTypeEnum.Human,
        email: 'test@example.com',
        emailVerified: true,
        password: 'testPassword123',
        timezone: 'UTC',
        createdAt: createdAt,
        updatedAt: createdAt,
        createdBy: creatorId,
        updatedBy: creatorId,
        metadata: {
            totalPosts: 0,
            totalReactionsReceived: 0,
            totalReactions: 0,
            totalVotes: 0,
            totalVotesReceived: 0,
            totalReplies: 0,
            totalProfileViewsReceived: 0,
            totalPostViewsReceived: 0,
            totalReplyViewsReceived: 0,
        },
    };
}

export async function getUserDoc(newUser: IUser): Promise<IUserDocument> {
    const hashedPassword = await hash(newUser.password, AppConstants.BcryptRounds);
    const newUserData: IUserDocument = {
      ...newUser,
      _id: new Types.ObjectId() as any,
      password: hashedPassword,
    } as IUserDocument;
    return newUserData;
}