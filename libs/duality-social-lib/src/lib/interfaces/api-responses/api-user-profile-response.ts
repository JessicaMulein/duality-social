import { IApiMessageResponse } from "./api-message-response";

export interface IApiUserProfileResponse extends IApiMessageResponse {
    profile: {
        username: string;
        bio: string;
        formattedBio: string;
        socialUrls: string[];
        verified: boolean;
        createdAt: Date;
        metadata: {
        totalPosts: number;
        totalReplies: number;
        totalReactionsReceived: number;
        totalVotesReceived: number;
        }
    }
}