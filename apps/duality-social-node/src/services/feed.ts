import { Request, Response } from 'express';
import { Schema, Types as MongooseTypes, PipelineStage } from 'mongoose';
import { ObjectId } from 'bson';
import { franc } from 'franc';
import { BaseModel, ModelName, IPost, IPostViewpoint, sanitizeWhitespace, HumanityTypeEnum, parsePostContent, IUser, IFeedPost, UserDocument, IProfile, IPostViewpointReaction, IPostViewpointHumanity } from '@duality-social/duality-social-lib';

const PostModel = BaseModel.getModel<IPost>(ModelName.Post);
const PostViewpointModel = BaseModel.getModel<IPostViewpoint>(ModelName.PostViewpoint);
const PostViewpointReactionModel = BaseModel.getModel<IPostViewpointReaction>(ModelName.PostViewpointReaction);
const PostViewpointHumanityModel = BaseModel.getModel<IPostViewpointHumanity>(ModelName.PostViewpointHumanity);
const UserModelData = BaseModel.getModelData(ModelName.User);
const maxPostLength = 1000;

export class FeedService {
  async getFeed(req: Request): Promise<IFeedPost[]> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const currentUser: UserDocument = req.user;
    const preferredLanguages = currentUser.languages;
    const currentDate = new Date();
    const maxDepth = 3; // Example depth limit
    const maxPosts = 10; // Example top-level posts limit
    const maxReplies = 10; // Example replies limit
    const aggregationPipeline: PipelineStage[] = [
      {
        $match: {
          active: true,
          createdAt: { $lte: currentDate },
          locked: { $ne: true },
          hidden: { $ne: true },
          deleted: { $ne: true }
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "createdBy",
          foreignField: "userId",
          as: "userProfile"
        }
      },
      {
        $unwind: "$userProfile"
      },
      {
        $project: {
          _id: 1,
          content: "$rendered",
          createdBy: {
            _id: "$userProfile.userId",
            displayName: { $concat: ["$userProfile.givenName", " ", "$userProfile.surname"] },
            avatarUrl: "$userProfile.avatarUrl"
          },
          createdAt: 1,
          updatedAt: 1,
          translation: 1,
          reactions: 1,
          humanityType: 1,
          interactionCount: { $add: [{ $size: "$reactions" }, { $size: "$replies" }] }
        }
      },
      {
        $addFields: {
          translations: {
            $map: {
              input: "$translations",
              as: "translation",
              in: {
                $mergeObjects: [
                  "$$translation",
                  { priority: { $indexOfArray: [preferredLanguages, "$$translation.language"] } }
                ]
              }
            }
          }
        }
      },
      {
        $unwind: {
          path: "$translations",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { "translations.priority": 1 }
      },
      {
        $group: {
          _id: "$_id",
          content: { $first: "$content" },
          createdBy: { $first: "$createdBy" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          translation: { $first: "$translations" },
          reactions: { $first: "$reactions" },
          humanityType: { $first: "$humanityType" },
          interactionCount: { $first: "$interactionCount" }
        }
      },
      {
        $sort: {
          interactionCount: -1,
          createdAt: -1
        }
      },
      {
        $limit: maxPosts
      },
      {
        $lookup: {
          from: "post-viewpoint-humanities",
          localField: "_id",
          foreignField: "viewpointId",
          as: "humanities"
        }
      },
      {
        $unwind: {
          path: "$humanities",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$_id",
          content: { $first: "$content" },
          createdBy: { $first: "$createdBy" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          translation: { $first: "$translation" },
          reactions: { $first: "$reactions" },
          humanityType: { $first: "$humanityType" },
          humanities: { $push: "$humanities" }
        }
      }
    ];
    try {
      const feed: IFeedPost[] = await PostModel.aggregate(aggregationPipeline).exec();
      return feed;
    } catch (error) {
      console.error('Error fetching feed:', error);
      throw error;
    }
  }

  async getMoreFeed(req: Request): Promise<IFeedPost[]> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const currentUser: UserDocument = req.user;
    const preferredLanguages = currentUser.languages;
    const currentDate = new Date();
    const maxPosts = 10; // Example top-level posts limit
    const maxReplies = 10; // Example replies limit
    const lastPostDate = req.query.lastPostDate as string;

    const aggregationPipeline: PipelineStage[] = [
      {
        $match: {
          active: true,
          createdAt: { $lte: currentDate, $lt: new Date(lastPostDate) },
          locked: { $ne: true },
          hidden: { $ne: true },
          deleted: { $ne: true }
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "createdBy",
          foreignField: "userId",
          as: "userProfile"
        }
      },
      {
        $unwind: "$userProfile"
      },
      {
        $project: {
          _id: 1,
          content: "$rendered",
          createdBy: {
            _id: "$userProfile.userId",
            displayName: { $concat: ["$userProfile.givenName", " ", "$userProfile.surname"] },
            avatarUrl: "$userProfile.avatarUrl"
          },
          createdAt: 1,
          updatedAt: 1,
          translation: 1,
          reactions: 1,
          humanityType: 1,
          interactionCount: { $add: [{ $size: "$reactions" }, { $size: "$replies" }] }
        }
      },
      {
        $addFields: {
          translations: {
            $map: {
              input: "$translations",
              as: "translation",
              in: {
                $mergeObjects: [
                  "$$translation",
                  { priority: { $indexOfArray: [preferredLanguages, "$$translation.language"] } }
                ]
              }
            }
          }
        }
      },
      {
        $unwind: {
          path: "$translations",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $sort: { "translations.priority": 1 }
      },
      {
        $group: {
          _id: "$_id",
          content: { $first: "$content" },
          createdBy: { $first: "$createdBy" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          translation: { $first: "$translations" },
          reactions: { $first: "$reactions" },
          humanityType: { $first: "$humanityType" },
          interactionCount: { $first: "$interactionCount" }
        }
      },
      {
        $sort: {
          interactionCount: -1,
          createdAt: -1
        }
      },
      {
        $limit: maxPosts
      },
      {
        $lookup: {
          from: "post-viewpoint-humanities",
          localField: "_id",
          foreignField: "viewpointId",
          as: "humanities"
        }
      },
      {
        $unwind: {
          path: "$humanities",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$_id",
          content: { $first: "$content" },
          createdBy: { $first: "$createdBy" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          translation: { $first: "$translation" },
          reactions: { $first: "$reactions" },
          humanityType: { $first: "$humanityType" },
          humanities: { $push: "$humanities" }
        }
      }
    ];
    try {
      const moreFeed: IFeedPost[] = await PostModel.aggregate(aggregationPipeline).exec();
      return moreFeed;
    } catch (error) {
      console.error('Error fetching more feed:', error);
      throw error;
    }
  }

  async getReplies(req: Request): Promise<IFeedPost[]> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const { parentId, maxPosts } = req.body;
    const userLanguages = req.user.languages || [];

    const aggregationPipeline: PipelineStage[] = [
      {
        $match: {
          pVpId: new ObjectId(parentId),
          active: true,
          locked: { $ne: true },
          hidden: { $ne: true },
          deleted: { $ne: true }
        }
      },
      {
        $lookup: {
          from: "profiles",
          localField: "createdBy",
          foreignField: "userId",
          as: "userProfile"
        }
      },
      {
        $unwind: "$userProfile"
      },
      {
        $project: {
          _id: 1,
          content: "$rendered",
          createdBy: {
            _id: "$userProfile.userId",
            displayName: { $concat: ["$userProfile.givenName", " ", "$userProfile.surname"] },
            avatarUrl: "$userProfile.avatarUrl"
          },
          createdAt: 1,
          updatedAt: 1,
          translations: 1,
          reactions: 1,
          humanityType: 1,
          interactionCount: { $add: [{ $size: "$reactions" }, { $size: "$replies" }] }
        }
      },
      {
        $addFields: {
          translations: {
            $map: {
              input: "$translations",
              as: "translation",
              in: {
                $mergeObjects: [
                  "$$translation",
                  { priority: { $indexOfArray: [userLanguages, "$$translation.language"] } }
                ]
              }
            }
          }
        }
      },
      {
        $match: {
          lang: { $in: userLanguages } // Filter by user's preferred languages
        }
      },
      {
        $unwind: {
          path: "$reactions",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "post-viewpoint-humanities",
          localField: "_id",
          foreignField: "viewpointId",
          as: "humanities"
        }
      },
      {
        $unwind: {
          path: "$humanities",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$_id",
          content: { $first: "$content" },
          createdBy: { $first: "$createdBy" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          translation: { $first: "$translations" },
          reactions: { $push: "$reactions" },
          humanityVotes: { $push: "$humanities" },
          interactionCount: { $first: "$interactionCount" }
        }
      },
      {
        $addFields: {
          reactionsByType: {
            $arrayToObject: {
              $map: {
                input: { $setUnion: "$reactions.type" },
                as: "type",
                in: {
                  k: "$$type",
                  v: { $size: { $filter: { input: "$reactions", as: "reaction", cond: { $eq: ["$$reaction.type", "$$type"] } } } }
                }
              }
            }
          },
          humanityVotesCount: { $size: "$humanityVotes" }
        }
      },
      {
        $sort: {
          interactionCount: -1,
          createdAt: -1
        }
      },
      {
        $limit: maxPosts
      }
    ];

    try {
      const replies: IFeedPost[] = await PostModel.aggregate(aggregationPipeline).exec();
      return replies;
    } catch (error) {
      console.error('Error fetching replies:', error);
      throw error;
    }
  }

  async newPost(req: Request, res: Response) {
    const content = sanitizeWhitespace(req.body.content);
    const rendered = parsePostContent(content);
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
      rendered: rendered,
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

  async reactToViewpoint(req: Request, res: Response) {
    const { viewpointId, reaction } = req.body;
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const userId = req.user._id;

    try {
      const viewpoint = await PostViewpointModel.findById(viewpointId);
      if (!viewpoint) {
        res.status(404).send('Viewpoint not found');
        return;
      }

      // Remove existing reaction if it exists
      await PostViewpointReactionModel.findOneAndDelete({ viewpointId, createdBy: userId });

      // Create new reaction if provided
      if (reaction) {
        const newReaction = new PostViewpointReactionModel({
          viewpointId,
          createdBy: userId,
          type: reaction
        });
        await newReaction.save();
      }

      res.status(200).json({ message: 'Reaction updated successfully' });
    } catch (error) {
      console.error('Error reacting to viewpoint:', error);
      res.status(500).send('Internal server error');
    }
  }

  async rateViewpoint(req: Request, res: Response): Promise<void> {
    if (req.user === undefined) {
      throw new Error('User not authenticated');
    }
    const currentUser: UserDocument = req.user;
    const { viewpointId, humanity } = req.body;

    if (!Object.values(HumanityTypeEnum).includes(humanity)) {
      throw new Error('Invalid humanity type');
    }

    try {
      // Check if the user has already rated this viewpoint
      const existingRating = await PostViewpointHumanityModel.findOne({
        viewpointId,
        createdBy: currentUser._id
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
          createdBy: currentUser._id
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