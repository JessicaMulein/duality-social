import express from 'express';
import { devilsAdvocate } from '../controllers/openai';
import { IUser } from '@duality-social/duality-social-lib';

export const openAiRouter = express
    .Router();

openAiRouter
    .post('/devils-advocate', (req, res) => {
        throw new Error('Not implemented');
        //devilsAdvocate(user, req, res);
    });