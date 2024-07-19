import { Request, Response } from 'express';
import { Schema } from 'mongoose';
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
                        parentPostId: null,
                        hidden: false,
                        deletedAt: null
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
                        localField: 'aiViewpointId',
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
                        connectToField: 'parentPostId',
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
                        meta: 1,
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

        if (content.length > maxPostLength) {
            res.status(400).send('Post content is too long');
            return;
        }
        if (content.length === 0) {
            res.status(400).send('Post content is empty');
            return;
        }

        const post = new PostModel({
            createdAt: currentDate,
            createdById: createdById,
            updatedAt: currentDate,
            updatedById: createdById,
            meta: {
                expands: 0,
                impressions: 0,
                reactions: 0,
                reactionsByType: {},
                updatedAt: currentDate,
            },
            // Other fields as necessary
        });

        try {
            const newPost = await PostModel.create(post);
            res.status(200).send(newPost);
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
}