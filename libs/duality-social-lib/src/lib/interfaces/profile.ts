import { IHasID } from "./hasId";
import { IHasTimestamps } from "./hasTimestamps";
import { IUser } from "./user";
import { IHasSoftDelete } from "./hasSoftDelete";

/**
 * Authentication object based profile
 */
export interface IProfile extends IHasID, IHasTimestamps, IHasSoftDelete {
    userId: IUser['_id'];
    givenName?: string;
    surname?: string;
    /**
     * Copy of the raw bio without formatting, allows us to change algorithms later but still cache.
     */
    bio: string;
    /**
     * Copy of the bio with formatting, cached field.
     */
    formattedBio: string;
    location?: string;
    avatarUrl?: string;
    coverImageUrl?: string;
    profileImageUrl?: string;
    socialUrls: string[];
    website?: string;
    verified: boolean;
    verifiedBy?: IUser['_id'];
  };