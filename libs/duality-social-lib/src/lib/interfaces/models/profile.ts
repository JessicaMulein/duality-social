import { Types } from 'mongoose';
import { IHasSoftDelete } from '../has-soft-delete.ts';
import { IHasTimestamps } from '../has-timestamps.ts';

/**
 * Authentication object based profile
 */
export interface IProfile extends IHasTimestamps, IHasSoftDelete {
  userId: Types.ObjectId;
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
  verifiedBy?: Types.ObjectId;
}
