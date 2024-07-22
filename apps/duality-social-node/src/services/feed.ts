import { Request, Response } from 'express';
import { Schema, Types as MongooseTypes, PipelineStage } from 'mongoose';
import { ObjectId } from 'bson';
import { franc } from 'franc';
import { BaseModel, ModelName, IPost, IPostViewpoint, sanitizeWhitespace, HumanityTypeEnum, parsePostContent, IUser } from '@duality-social/duality-social-lib';

const PostModel = BaseModel.getModel<IPost>(ModelName.Post);
const PostViewpointModel = BaseModel.getModel<IPostViewpoint>(ModelName.PostViewpoint);
const UserModelData = BaseModel.getModelData(ModelName.User);
const maxPostLength = 1000;

export class FeedService {
    async getFeed(currentUser: IUser): Promise<IPostViewpoint[]> {
        const preferredLanguages = currentUser.languages;
        const currentDate = new Date();
      
        const aggregationPipeline: PipelineStage[] = [
          // Updated match stage to exclude locked, hidden, or deleted posts
          // and ensure both input viewpoint and AI viewpoint are present
          { 
            $match: {
              active: true, 
              createdAt: { $lte: currentDate },
              locked: { $ne: true }, // Excludes locked posts
              hidden: { $ne: true }, // Excludes hidden posts
              deleted: { $ne: true }, // Excludes deleted posts
              inputViewpoint: { $exists: true }, // Ensures input viewpoint exists
              aiViewpoint: { $exists: true } // Ensures AI viewpoint exists
            } 
          },
          // Lookup stage to join with translations
          { 
            $lookup: {
              from: "translations",
              localField: "_id",
              foreignField: "viewpointId",
              as: "translations"
            }
          },
          // Project stage to filter and prioritize translations
          { 
            $project: {
              content: 1,
              translations: {
                $filter: {
                  input: "$translations",
                  as: "translation",
                  cond: { $in: ["$$translation.language", preferredLanguages] }
                }
              },
            }
          },
          // Add field for translation priority
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
          // Unwind translations for sorting
          { 
            $unwind: {
              path: "$translations",
              preserveNullAndEmptyArrays: true
            }
          },
          // Sort by translation priority
          { 
            $sort: { "translations.priority": 1 } 
          },
          // Group to ensure only top-priority translation is kept
          { 
            $group: {
              _id: "$_id",
              content: { $first: "$content" },
              translation: { $first: "$translations" }
            }
          },
          // Optionally, project to format the output
          { 
            $project: {
              _id: 1,
              content: 1,
              translation: 1,
            }
          }
        ];
      
        try {
            const feedItems: IPostViewpoint[] = await PostViewpointModel.aggregate(aggregationPipeline).exec();
            return feedItems;
        } catch (error) {
            console.error('Error fetching feed:', error);
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
}