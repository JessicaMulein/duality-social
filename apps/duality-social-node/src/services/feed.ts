import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import {
  AppConstants,
  ContentEmptyError,
  ContentTooLongError,
  DefaultReactionsTypeEnum,
  getCharacterCount,
  HumanityTypeEnum,
  IFeedPost,
  IFeedPostViewpoint,
  ImageUploadError,
  InvalidImageDimensionError,
  IPost,
  IPostDocument,
  IPostViewpoint,
  IPostViewpointDocument,
  IRequestUser,
  MaxImageSizeError,
  NestedBlogError,
  ParentPostIdMismatchError,
  ParentPostNotFoundError,
  ParentViewpointNotFoundError,
  parsePostContent,
  sanitizeWhitespace,
  ViewpointTypeEnum,
} from '@duality-social/duality-social-lib';
import {
  PostExpandModel,
  PostImpressionModel,
  PostModel,
  PostViewpointHumanityModel,
  PostViewpointModel,
  PostViewpointReactionModel,
} from '@duality-social/duality-social-node-lib';
import { Request, Response } from 'express';
import sizeOf from 'image-size';
import {
  Types as MongooseTypes,
  ObjectId,
  PipelineStage,
  Types,
} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../environment.ts';
import { MulterRequest } from '../interfaces/multer-request.ts';
import { INewPostResult } from '../interfaces/new-post-result.ts';

export class FeedService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({
      credentials: {
        accessKeyId: environment.aws.accessKeyId,
        secretAccessKey: environment.aws.secretAccessKey,
      },

      region: environment.aws.region,
    });
  }

  /**
   * For a given viewpoint, update its metadata to reflect the current state of the post.
   * @param viewpointId
   */
  async recalculateViewpointMetadata(viewpointId: ObjectId): Promise<void> {
    const viewpoint = await PostViewpointModel.findById(viewpointId);
    if (viewpoint === null) {
      throw new Error('Viewpoint not found');
    }

    const replyCount = await PostModel.countDocuments({ rVpId: viewpointId });
    const reactions = await PostViewpointReactionModel.find({ viewpointId });
    const reactionsByType: { [key in DefaultReactionsTypeEnum]: number } = {
      Angry: 0,
      Care: 0,
      Celebrate: 0,
      Hug: 0,
      'Huh?': 0,
      Laugh: 0,
      Like: 0,
      Love: 0,
      Sad: 0,
      Wow: 0,
      Yuck: 0,
    };
    for (const reaction of reactions) {
      reactionsByType[reaction.reaction] += 1;
    }
    const impressions = await PostImpressionModel.countDocuments({
      viewpointId,
    });
    const expands = await PostExpandModel.countDocuments({ viewpointId });
    const humanityVotesCount = await PostViewpointHumanityModel.countDocuments({
      viewpointId,
    });

    viewpoint.metadata.replies = replyCount;
    viewpoint.metadata.expands = expands;
    viewpoint.metadata.impressions = impressions;
    viewpoint.metadata.reactions = reactions.length;
    viewpoint.metadata.reactionsByType = reactionsByType;
    viewpoint.metadata.votes = humanityVotesCount;
    await viewpoint.save();
  }

  /**
   * Get the feed for the authenticated user.
   * @param req
   * @param maxPosts
   * @returns
   */
  async getFeed(req: Request, maxPosts = 10): Promise<IFeedPost[]> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const currentUser: IRequestUser = req.user;
    const mostRecentPostId: MongooseTypes.ObjectId | undefined = req.query
      .mostRecentPostId
      ? new MongooseTypes.ObjectId(req.query.mostRecentPostId as string)
      : undefined;
    const preferredLanguages = currentUser.languages;

    const matchStage: PipelineStage = {
      $match: {
        active: true,
        locked: { $ne: true },
        hidden: { $ne: true },
        deleted: { $ne: true },
      },
    };

    if (mostRecentPostId) {
      matchStage.$match._id = { $gt: mostRecentPostId };
    }

    const aggregationPipeline: PipelineStage[] = [
      matchStage,
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $match: {
          $or: [{ 'user.shadowBan': false }, { 'user._id': currentUser.id }],
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'createdBy',
          foreignField: 'userId',
          as: 'userProfile',
        },
      },
      {
        $unwind: '$userProfile',
      },
      {
        $lookup: {
          from: 'postviewpoints',
          let: { postId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$postId', '$$postId'] },
                    { $in: ['$lang', preferredLanguages] },
                  ],
                },
              },
            },
          ],
          as: 'viewpoints',
        },
      },
      {
        $addFields: {
          activityScore: {
            $add: [
              { $size: '$viewpoints' },
              { $sum: '$viewpoints.metadata.replies' },
              { $sum: '$viewpoints.metadata.reactions' },
              { $sum: '$viewpoints.metadata.humanityByType' },
            ],
          },
        },
      },
      {
        $sort: {
          activityScore: -1,
          createdAt: -1,
        },
      },
      {
        $limit: maxPosts,
      },
    ];

    const posts = await PostModel.aggregate(aggregationPipeline).exec();

    const feedPosts: IFeedPost[] = await Promise.all(
      posts.map(async (post) => ({
        id: post._id,
        createdAt: post.createdAt,
        createdBy: post.createdBy,
        viewpoints: await this.getViewpoints(post._id, preferredLanguages),
      })),
    );

    return feedPosts;
  }

  private async getViewpoints(
    postId: Types.ObjectId,
    preferredLanguages: string[],
  ): Promise<IFeedPostViewpoint[]> {
    const viewpoints = await PostViewpointModel.find({
      postId,
      lang: { $in: preferredLanguages },
    }).exec();
    return Promise.all(
      viewpoints.map(async (viewpoint) => ({
        id: viewpoint._id,
        content: viewpoint.content,
        rendered: viewpoint.rendered,
        translated: viewpoint.translated,
        lang: viewpoint.lang,
        metadata: {
          replies: viewpoint.metadata.replies,
          expands: viewpoint.metadata.expands,
          impressions: viewpoint.metadata.impressions,
          reactions: viewpoint.metadata.reactions,
          reactionsByType: viewpoint.metadata.reactionsByType,
          humanityByType: viewpoint.metadata.humanityByType,
          votes: viewpoint.metadata.votes,
        },
        type: viewpoint.type,
        createdAt: viewpoint.createdAt,
        createdBy: viewpoint.createdBy,
        replies: await this.getReplies(viewpoint.id, preferredLanguages),
      })),
    );
  }

  private async getReplies(
    viewpointId: Types.ObjectId,
    preferredLanguages: string[],
  ): Promise<IFeedPost[]> {
    const replies = await PostModel.find({
      $or: [{ inVpId: viewpointId }, { aiVpId: viewpointId }],
    }).exec();
    return Promise.all(
      replies.map(async (reply) => ({
        id: reply._id,
        createdAt: reply.createdAt,
        createdBy: reply.createdBy,
        viewpoints: await this.getViewpoints(reply.id, preferredLanguages),
      })),
    );
  }

  /**
   * Create a new post.
   * @param req
   * @param res
   * @returns
   */
  async newPost(req: Request): Promise<INewPostResult> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }

    const content = sanitizeWhitespace(req.body.content);
    const isBlogPost = req.body.isBlogPost === 'true';
    const parentViewpointId: Types.ObjectId | undefined = req.body
      .parentViewpointId
      ? new Types.ObjectId(req.body.parentViewpointId as string)
      : undefined;
    const parentPostId: Types.ObjectId | undefined = req.body.parentPostId
      ? new Types.ObjectId(req.body.parentPostId as string)
      : undefined;
    const rendered = parsePostContent(content, isBlogPost);
    const currentDate = new Date();
    const createdById = new Types.ObjectId(req.user.id);
    const language = await this.detectPostLanguage(content);

    const maxLength = isBlogPost
      ? AppConstants.MaxBlogPostLength
      : AppConstants.MaxPostLength;
    const characterCount = getCharacterCount(content, isBlogPost);

    if (characterCount > maxLength) {
      throw new ContentTooLongError(characterCount);
    }
    if (characterCount === 0) {
      throw new ContentEmptyError();
    }

    if (isBlogPost && (parentPostId || parentViewpointId)) {
      throw new NestedBlogError();
    }

    const parentPost: IPostDocument | null = parentPostId
      ? await PostModel.findById(parentPostId).exec()
      : null;

    if (!parentPost && parentPostId) {
      throw new ParentPostNotFoundError(parentPostId.toString());
    }

    const parentViewpoint: IPostViewpointDocument | null = parentViewpointId
      ? await PostViewpointModel.findById(parentViewpointId).exec()
      : null;

    if (!parentViewpoint && parentViewpointId) {
      throw new ParentViewpointNotFoundError(parentViewpointId.toString());
    }

    if (
      parentPostId &&
      parentPost &&
      parentViewpointId &&
      parentViewpoint &&
      !parentViewpoint.postId.equals(parentPost._id)
    ) {
      throw new ParentPostIdMismatchError(
        parentPostId.toString(),
        parentViewpointId.toString(),
      );
    }

    // Handle image uploads
    const imageUrls: string[] = [];
    const multerReq = req as MulterRequest;
    if (multerReq.files && Array.isArray(multerReq.files.images)) {
      for (const image of multerReq.files.images as Express.Multer.File[]) {
        // Validate image size
        if (image.size > AppConstants.MaxImageSize) {
          throw new MaxImageSizeError(image.size);
        }

        // Validate image dimensions
        const dimensions = sizeOf(image.buffer);
        if (
          dimensions.width &&
          dimensions.height &&
          (dimensions.width > AppConstants.MaxImageDimensions.width ||
            dimensions.height > AppConstants.MaxImageDimensions.height)
        ) {
          throw new InvalidImageDimensionError(
            dimensions.width,
            dimensions.height,
          );
        }

        // Upload to S3
        const uploadParams = {
          Bucket: environment.aws.bucketName,
          Key: `posts/${uuidv4()}-${image.originalname}`,
          Body: image.buffer,
          ContentType: image.mimetype,
        };

        try {
          const uploadResult = await new Upload({
            client: this.s3,
            params: uploadParams,
          }).done();
          if (!uploadResult || !uploadResult.Location) {
            throw new Error('Upload failed');
          }
          imageUrls.push(uploadResult.Location);
        } catch (error) {
          console.error('Error uploading image to S3:', error);
          throw new ImageUploadError(error);
        }
      }
    }

    const postId = new Types.ObjectId();
    const inputViewpointId = new Types.ObjectId();
    const requestedLanguages = language !== 'en' ? ['en'] : [];
    const depth = !parentPost ? 0 : parentPost.depth + 1;
    return {
      post: await PostModel.create({
        _id: postId,
        depth: depth,
        createdAt: currentDate,
        createdBy: createdById,
        updatedAt: currentDate,
        updatedBy: createdById,
        pId: parentPostId,
        pIds: parentPost ? [...parentPost.pIds, parentPostId] : [],
        vpId: parentViewpointId,
        vpPIds: parentPost ? [...parentPost.vpPIds, parentViewpointId] : [],
        inVpId: inputViewpointId,
        inVpTransIds: [],
        aiVpTransIds: [],
        aiReqTransLangs: requestedLanguages,
        reqTransLangs: requestedLanguages,
        imageUrls: imageUrls,
        hidden: false,
        metadata: {
          expands: 0,
          impressions: 0,
          reactions: 0,
          reactionsByType: {
            Angry: 0,
            Care: 0,
            Celebrate: 0,
            Hug: 0,
            'Huh?': 0,
            Laugh: 0,
            Like: 0,
            Love: 0,
            Sad: 0,
            Wow: 0,
            Yuck: 0,
          },
          replies: 0,
          votes: 0,
        },
      } as IPost),

      viewpoint: await PostViewpointModel.create({
        _id: inputViewpointId,
        postId: postId,
        humanity: req.user?.humanityType ?? HumanityTypeEnum.Human,
        createdAt: currentDate,
        createdBy: createdById,
        updatedAt: currentDate,
        updatedBy: createdById,
        content: content,
        rendered: rendered,
        translated: false,
        type: ViewpointTypeEnum.HumanSource,
        lang: language,
        metadata: {
          expands: 0,
          impressions: 0,
          reactions: 0,
          reactionsByType: {
            Angry: 0,
            Care: 0,
            Celebrate: 0,
            Hug: 0,
            'Huh?': 0,
            Laugh: 0,
            Like: 0,
            Love: 0,
            Sad: 0,
            Wow: 0,
            Yuck: 0,
          },
          humanityByType: {
            Human: 0,
            Bot: 0,
            Ai: 0,
          },
          replies: 0,
          votes: 0,
        },
      } as IPostViewpoint),
    };
  }

  /**
   * Locally (without calling an external API) detect the language of a given text.
   * @param text
   * @returns The detected language code or 'unknown' if the language cannot be detected.
   */
  async detectPostLanguage(text: string): Promise<string> {
    try {
      // Use franc to detect the language
      const { franc } = await import('franc');
      const languageCode = franc(text);

      if (languageCode === 'und') {
        return 'unknown';
      } else {
        return languageCode;
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      throw new Error(
        'An error occurred while detecting the language of the text',
      );
    }
  }

  async reactToViewpoint(req: Request, res: Response) {
    const { viewpointId, reaction } = req.body;
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const userId = req.user.id;

    try {
      const viewpoint = await PostViewpointModel.findById(viewpointId);
      if (!viewpoint) {
        res.status(404).send('Viewpoint not found');
        return;
      }

      // Remove existing reaction if it exists
      await PostViewpointReactionModel.findOneAndDelete({
        viewpointId,
        createdBy: userId,
      });

      // Create new reaction if provided
      if (reaction) {
        const newReaction = new PostViewpointReactionModel({
          viewpointId,
          createdBy: userId,
          type: reaction,
        });
        await newReaction.save();
      }

      res.status(200).json({ message: 'Reaction updated successfully' });
    } catch (error) {
      console.error('Error reacting to viewpoint:', error);
      res.status(500).send('Internal server error');
    }
  }

  /**
   * Records a user's vote on the humanity of a viewpoint.
   * @param req
   * @param res
   */
  async voteViewpointHumanity(req: Request, res: Response): Promise<void> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const currentUser: IRequestUser = req.user;
    const { viewpointId, humanity } = req.body;

    if (!Object.values(HumanityTypeEnum).includes(humanity)) {
      throw new Error('Invalid humanity type');
    }

    try {
      // Check if the user has already rated this viewpoint
      const existingRating = await PostViewpointHumanityModel.findOne({
        viewpointId,
        createdBy: currentUser.id,
      });

      if (existingRating) {
        // If the user has already rated, update the rating
        existingRating.humanity = humanity;
        await existingRating.save();
      } else {
        // If the user has not rated yet, create a new rating
        const newRating = new PostViewpointHumanityModel({
          viewpointId,
          humanity,
          createdBy: currentUser.id,
        });
        await newRating.save();
      }

      res.status(200).send({ message: 'Rating submitted successfully' });
    } catch (error) {
      console.error('Error rating viewpoint:', error);
      res.status(500).send({ error: 'Error rating viewpoint' });
    }
  }
}
