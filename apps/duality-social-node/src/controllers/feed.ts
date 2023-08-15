import {
    sanitizeWhitespace,
    HumanityTypeEnum,
    IPostViewpoint,
    BaseModel,
    ModelName,
    IPost,
} from '@duality-social/duality-social-lib';
import { Request, Response } from 'express';
import { Schema } from 'mongoose';

const maxPostLength = 1000;

const UserModelData = BaseModel.ModelDataMap.get(ModelName.User);
const PostModel = BaseModel.getModel<IPost>(ModelName.Post);
const PostViewpointModel = BaseModel.getModel<IPostViewpoint>(ModelName.PostViewpoint);

export async function newPost(req: Request, res: Response) {
    const content = sanitizeWhitespace(req.body.content);
    const currentDate = new Date();
    const createdById = new Schema.Types.ObjectId(UserModelData!.path);

    // validate the request
    if (content.length > maxPostLength) {
        res.status(400).send('Post content is too long');
        return;
    }
    if (content.length === 0) {
        res.status(400).send('Post content is empty');
        return;
    }

    // TODO: use session/transaction
    // create a new post
    const post = new PostModel({
        inReplyToViewpointId: undefined,
        inputViewpointId: undefined,
        aiViewpointId: undefined,
        parentId: undefined,
        parents: [],
        viewpointParents: [],
        meta: {
            expands: 0,
            impressions: 0,
            reactions: 0,
            reactionsByType: {},
            updatedAt: currentDate,
        },
        createdAt: currentDate,
        createdById: createdById,
        updatedAt: currentDate,
        updatedById: createdById,
    });
    // save the post
    const newPostId = (await PostModel.create(post))._id;
    if (newPostId === undefined) {
        throw new Error('post._id is undefined');
    }
    post._id = newPostId;
    // create the input viewpoint
    const inputViewpoint = new PostViewpointModel({
        postId: newPostId,
        content: content,
        language: 'en',
        humanityType: HumanityTypeEnum.Human,
        parentViewpointId: undefined,
        meta: {
            expands: 0,
            impressions: 0,
            reactions: 0,
            reactionsByType: {},
        },
        createdAt: currentDate,
        createdById: createdById,
        updatedAt: currentDate,
        updatedById: createdById,
    });
    // save the input viewpoint
    const inputViewpointId = (await PostViewpointModel.create(inputViewpoint))._id;
    if (inputViewpointId === undefined) {
        throw new Error('inputViewpoint._id is undefined');
    }
    inputViewpoint._id = inputViewpointId;
    // update the post with the input viewpoint id
    post.inputViewpointId = inputViewpointId;
    const updateStatus = await PostModel.updateOne(
        { _id: newPostId }, {
            $set: {
                inputViewpointId: inputViewpointId,
            },
        }
    );
    if (updateStatus.modifiedCount !== 1) {
        throw new Error('Post input viewpoint id not updated');
    }
    res.status(200).send(post);
}

export async function newReply(req: Request, res: Response) {
    const content = sanitizeWhitespace(req.body.content);
    const currentDate = new Date();
    const createdById = new Schema.Types.ObjectId(UserModelData!.path);
    const parentViewpointId = req.body.parentViewpointId;
    const parentPostId = req.body.parentPostId;

    // validate the request
    if (content.length > maxPostLength) {
        res.status(400).send('Post content is too long');
        return;
    }
    if (content.length === 0) {
        res.status(400).send('Post content is empty');
        return;
    }

    // look for the parent viewpoint
    const parentViewpoint = await PostViewpointModel.findOne<IPostViewpoint>({
        _id: parentViewpointId,
    });
    if (parentViewpoint === null) {
        res.status(400).send('Parent viewpoint not found');
        return;
    }
    // the parent viewpoint should have the post id, and it should match
    if (parentViewpoint.postId !== parentPostId) {
        res.status(400).send('Parent viewpoint does not match parent post');
        return;
    }

    
}