import { HumanityTypeEnum, IRequestUser } from "@duality-social/duality-social-lib";

export function makeRequestUser(): IRequestUser {
    return {
        id: 'mockUserId',
        roles: [],
        username: 'testUser',
        email: 'test@example.com',
        emailVerified: true,
        timezone: 'UTC',
        languages: ['en'],
        humanityType: HumanityTypeEnum.Human,
    }
}