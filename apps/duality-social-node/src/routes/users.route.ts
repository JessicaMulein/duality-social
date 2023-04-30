/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import express = require('express');
import { Request, Response, Router} from 'express';
import { fetch } from '../fetch';
import { environment } from '../environments/environment';
import { ensureAuthenticated } from '../auth.middleware';
export const usersRouter = Router();

// allows unauthorized users to POST to /users/login
// usersRouter.post(
//   '/login', // POST /users/login
//   login // use the login POST handler
// )

usersRouter.get(
  '/id',
  ensureAuthenticated, // check if user is authenticated
  async function (req: Request, res: Response, next: (error: unknown) => void) {
    if (!req.session || !req.session.account) {
      next(new Error('Session not found'));
      return;
    }
    res.render('id', { idTokenClaims: req.session.account.idTokenClaims });
  }
);

usersRouter.get(
  '/profile',
  ensureAuthenticated, // check if user is authenticated
  async function (req, res, next) {
    try {
      const graphResponse = await fetch(
        environment.msal.graphMeEndpoint,
        req.session?.accessToken ?? ''
      );
      res.render('profile', { profile: graphResponse });
      console.log(graphResponse);
    } catch (error) {
      next(error);
    }
  }
);
