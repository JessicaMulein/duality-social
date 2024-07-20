import { Request, Response } from 'express';
import { Schema, Types as MongooseTypes } from 'mongoose';
import { ObjectId } from 'bson';
import { franc, francAll } from 'franc';
import { BaseModel, ModelName, IPost, IPostViewpoint, sanitizeWhitespace, HumanityTypeEnum } from '@duality-social/duality-social-lib';

const PostModel = BaseModel.getModel<IPost>(ModelName.Post);
const PostViewpointModel = BaseModel.getModel<IPostViewpoint>(ModelName.PostViewpoint);
const UserModelData = BaseModel.getModelData(ModelName.User);
const maxPostLength = 1000;

export class FeedService {
    async getFeed(req: Request, res: Response) {
        const userId = new Schema.Types.ObjectId(req.params.userId);
        const depth = parseInt(req.query.depth as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const page = parseInt(req.query.page as string) || 1;
        const skip = (page - 1) * limit;

        try {
            const posts = await PostModel.aggregate([
                {
                    $match: {
                        hidden: false,
                        deletedAt: null,
                        procLockId: { $exists: false},
                        inVpId: { $exists: true },
                        aiVpId: { $exists: true },
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                // In the getFeed method, adjust the aggregation pipeline to include both viewpoints and their replies.
                // This is a conceptual adjustment and might need further refinement based on the actual data model.
                {
                    $lookup: {
                        from: 'viewpoints', // Assuming 'viewpoints' collection stores both original and AI viewpoints
                        localField: '_id',
                        foreignField: 'postId',
                        as: 'viewpoints'
                    }
                },
                {
                    $unwind: '$viewpoints'
                },
                // Further adjustments to fetch replies for each viewpoint might be needed here.
                {
                    $lookup: {
                        from: 'postviewpoints',
                        localField: 'aiVpId',
                        foreignField: '_id',
                        as: 'aiViewpoint'
                    }
                },
                {
                    $unwind: {
                        path: '$aiViewpoint',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createdBy',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
                {
                    $unwind: '$author'
                },
                {
                    $graphLookup: {
                        from: 'posts',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'pId',
                        as: 'replies',
                        maxDepth: depth - 1,
                        depthField: 'depth'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        metadata: 1,
                        'inputViewpoint._id': 1,
                        'inputViewpoint.content': 1,
                        'aiViewpoint._id': 1,
                        'aiViewpoint.content': 1,
                        'author._id': 1,
                        'author.username': 1,
                        replies: {
                            $slice: ['$replies', 5]
                        },
                        hasMoreReplies: {
                            $gt: [{ $size: '$replies' }, 5]
                        }
                    }
                }
            ]);

            res.status(200).json({
                posts,
                page,
                limit,
                hasMore: posts.length === limit
            });
        } catch (error) {
            console.error('Error fetching feed:', error);
            res.status(500).send('An error occurred while fetching the feed');
        }
    }

    async newPost(req: Request, res: Response) {
        const content = sanitizeWhitespace(req.body.content);
        const currentDate = new Date();
        const createdById = new Schema.Types.ObjectId(UserModelData.path);
        const language = await this.detectPostLanguage(content);

        if (content.length > maxPostLength) {
            res.status(400).send('Post content is too long');
            return;
        }
        if (content.length === 0) {
            res.status(400).send('Post content is empty');
            return;
        }

        const postId = new MongooseTypes.ObjectId(new ObjectId().toString());
        const inputViewpointId = new MongooseTypes.ObjectId(new ObjectId().toString());
        // ensure we always have a copy of the post in english
        const requestedLanguages = language !== 'en' ? ['en'] : [];
        const post = new PostModel({
            _id: postId,
            createdAt: currentDate,
            createdById: createdById,
            updatedAt: currentDate,
            updatedById: createdById,
            inVpId: inputViewpointId,
            reqTransLangs: requestedLanguages,
            metadata: {
                expands: 0,
                impressions: 0,
                reactions: 0,
                reactionsByType: {},
                updatedAt: currentDate,
            },
        });

        const inputViewpoint = new PostViewpointModel({
            _id: inputViewpointId,
            postId: postId,
            humanity: HumanityTypeEnum.Human,
            createdAt: currentDate,
            createdBy: createdById,
            content: content,
            lang: language,
            metadata: {
                expands: 0,
                impressions: 0,
                reactions: 0,
                reactionsByType: {},
            },
        });
        try {
            const newPost = await PostModel.create(post);
            const newViewpoint = await PostViewpointModel.create(inputViewpoint);
            res.status(200).send({
                post: newPost,
                viewpoint: newViewpoint
            });
        } catch (error) {
            console.error('Error creating new post:', error);
            res.status(500).send('An error occurred while creating the post');
        }
    }

    async newReply(req: Request, res: Response) {
        const parentId = req.body.parentId;
        const content = sanitizeWhitespace(req.body.content);
        const createdBy = new Schema.Types.ObjectId(req.body.createdBy); // Assuming the user ID is passed in the request
        const currentDate = new Date();

        if (!parentId) {
            res.status(400).send('Parent post ID is required');
            return;
        }
        if (content.length === 0) {
            res.status(400).send('Reply content cannot be empty');
            return;
        }
        if (content.length > maxPostLength) {
            res.status(400).send('Reply content exceeds maximum length');
            return;
        }

        try {
            const parentPost = await PostModel.findById(parentId);
            if (!parentPost) {
                res.status(404).send('Parent post not found');
                return;
            }

            const reply = new PostModel({
                content: content,
                createdBy: createdBy,
                createdAt: currentDate,
                updatedAt: currentDate,
                parentPostId: parentId,
                // Other fields as necessary
            });

            const newReply = await reply.save();
            res.status(201).json(newReply);
        } catch (error) {
            console.error('Error creating new reply:', error);
            res.status(500).send('An error occurred while creating the reply');
        }
    }

    /**
     * Locally (without calling an external API) detect the language of a given text.
     * @param text 
     * @returns The detected language code or 'unknown' if the language cannot be detected.
     */
    async detectPostLanguage(text: string): Promise<string> {
        try {
            // Use franc to detect the language
            const languageCode = franc(text);
    
            if (languageCode === 'und') {
                return 'unknown';
            } else {
                return languageCode;
            }
        } catch (error) {
            console.error('Error detecting language:', error);
            throw new Error('An error occurred while detecting the language of the text');
        }
    }
}