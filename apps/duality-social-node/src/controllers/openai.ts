import { Request, Response } from 'express';
import {
    DevilsAdvocateImagePrompt,
    getOppositeResponseFromOpenAI
} from '../services/openai';
import { IDevilsAdvocateRequest, IDevilsAdvocateResponse, HumanityTypeEnum, BaseModel, IPost, ModelName, IPostViewpoint } from '@duality-social/duality-social-lib';
import { Schema, Types as MongooseTypes } from 'mongoose';
import { ObjectId } from 'bson';
import { ViewpointTypeEnum, IUser } from '@duality-social/duality-social-lib';

const PostModel = BaseModel.getModel<IPost>(ModelName.Post);
const PostViewpointModel = BaseModel.getModel<IPostViewpoint>(ModelName.PostViewpoint);
const PostViewpointModelData = BaseModel.getModelData(ModelName.PostViewpoint);

export async function devilsAdvocate(user: IUser, req: Request, res: Response): Promise<void> {
    // stuff the entry in the queue.
    // get the id of the entry, this will be the id of the Post
    // each of the two PostViewpoints will have a reference to the Post
    // the Post will have a reference to the input viewpoint
    // the Post will have a reference to the response viewpoint
    // I say input viewpoint because we may have bots allowed on the platform.

    const body = req.body;
    const parentId: MongooseTypes.ObjectId | undefined = new MongooseTypes.ObjectId(req.params.parentId) ?? undefined;
    const userId = new MongooseTypes.ObjectId(new ObjectId().toString()); // TODO: get from auth
    console.log('user', user, userId);
    if (body === undefined) {
        res.status(400).json({
            error: 'No request body'
        });
        return;
    }
    const postId = new MongooseTypes.ObjectId(new ObjectId().toString());
    const humanViewpoint = new PostViewpointModel({
        post: postId,
        humanity: HumanityTypeEnum.Human,
        content: body.postContent,
        lang: 'en',
        viewpointType: ViewpointTypeEnum.HumanSource,
        createdBy: userId,
        updatedBy: userId
    });
    const humanViewpointId = (await PostViewpointModel.create(humanViewpoint))._id;
    if (humanViewpointId === undefined) {
        res.status(500).json({
            error: 'Failed to create human viewpoint'
        });
        return;
    }
    const post = await PostModel.create({
        _id: postId,
        inVpId: humanViewpointId,
        imageUrls: [],
        parent: parentId,
        pIds: [],
        vpPIds: [],
        createdBy: userId,
        updatedBy: userId,
        deletedBy: undefined
    });
    if (post === undefined || post._id === undefined) {
        res.status(500).json({
            error: 'Failed to create post'
        });
        return;
    }

    const aiRequest: IDevilsAdvocateRequest = body as IDevilsAdvocateRequest;
    if (aiRequest === undefined) {
        res.status(400).json({
            error: 'Invalid request body'
        });
        return;
    }
    try {
        const openaiResponse = await getOppositeResponseFromOpenAI(
            aiRequest.postText,
            post._id,
            userId);
        const aiPostText = openaiResponse.aiResponse;
        const dallEPrompt = DevilsAdvocateImagePrompt.concat("\n\n", aiPostText);
        // if post has embedded image, generate an image using DALL-E
        // TODO: change await pattern to Promise.all
        const response: IDevilsAdvocateResponse = {
            postId: postId.toString(),
            aiPostText: aiPostText,
        };
        const aiViewpoint = new PostViewpointModel({
            postId: postId,
            humanityType: HumanityTypeEnum.Ai,
            content: aiPostText,
            createdBy: userId,
            updatedBy: userId
        });
        const aiViewpointId = (await PostViewpointModel.create(aiViewpoint))._id;
        aiViewpoint._id = aiViewpointId;
        post.aiVpId = aiViewpointId ?? new Schema.Types.ObjectId(PostViewpointModelData.path);
        const updateStatus = await PostModel.updateOne(
            { _id: post._id },
            { $set: { aiVpId: aiViewpointId } }
        );
        if (updateStatus.modifiedCount == 0) {
            res.status(500).json({
                error: 'Failed to update post'
            });
            return;
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}
