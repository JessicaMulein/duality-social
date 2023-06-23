import express from 'express';
import { devilsAdvocate } from '../controllers/openai';

// all routes prefixed with /api/openai
export const openAiRouter = express
    .Router();

// Commands
// -----
// /api/openai/devils-advocate
openAiRouter
    .post('/devils-advocate', devilsAdvocate);