import { ObjectId } from 'mongoose';
import { IHasDeleter } from './hasDeleter';
import { IHasSoftDelete } from './hasSoftDelete';
import { IHasTimestampOwners } from './hasTimestampOwners';
import { IHasTimestamps } from './hasTimestamps';

/**
 * This interface represents a post, which is a piece of content that a user can create.
 * One post will consist of a minimum of two viewpoints- one from the user and one from the AI.
 * There may be additional "viewpoints" that are AI translations of either of the other viewpoints.
 * There is no point in keeping both source and rendered copies of translations, so we only keep rendered translations.
 * Source - Human
 * Rendered - Human
 * Source - AI
 * Rendered - AI
 * Rendered - AI Translation
 * It inherits from IHasID, which provides the id property, IHasCreation, which provides the createdAt and updatedAt properties, and IHasSoftDelete, which provides the deletedAt property.
 */
export interface IPost extends IHasTimestamps, IHasSoftDelete, IHasTimestampOwners, IHasDeleter {
    hidden: boolean;
    depth: number;
    replies: number;
    lastReplyAt?: Date;
    lastReplyBy?: ObjectId;
    /**
     * The id of the parent post if this is a reply.
     */
    pId?: ObjectId;
    /**
     * Tree of parentIDs
     */
    pIds: ObjectId[];
    /**
     * The id of the viewpoint that this viewpoint is a reply to.
     */
    rVpId?: ObjectId;
    /**
     * Tree of viewpoint parents
     */
    vpPIds: ObjectId[];
    /**
     * The id of the viewpoint that the user inputted.
     */
    inVpId?: ObjectId;
    inVpTransIds: ObjectId[];
    reqTransLangs: string[];
    /**
     * The id of the viewpoint that the AI generated.
     */
    aiVpId?: ObjectId;
    aiVpTransIds: ObjectId[];
    aiReqTransLangs: string[];
    /**
     * URLs of embedded images
     */
    imageUrls: string[];
    //metadata
    metadata: {
        expands: number,
        impressions: number,
        reactions: number,
        reactionsByType: { [key: string]: number };
    };
    // the id of the service that is processing the post
    procLockId?: string;
    procLockDate?: Date;
}