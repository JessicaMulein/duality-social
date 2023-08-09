/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import express = require('express');
import { Request, Response, Router} from 'express';
import { fetch } from '../fetch';
import { environment } from '../environments/environment';
export const usersRouter = Router();

// allows unauthorized users to POST to /users/login
// usersRouter.post(
//   '/login', // POST /users/login
//   login // use the login POST handler
// )

usersRouter.get(
  '/id',
  async function (req: Request, res: Response, next: (error: unknown) => void) {
    // if (!req.session || !req.session.account) {
      next(new Error('Session not found'));
    //   return;
    // }
    // res.render('id', { idTokenClaims: req.session.account.idTokenClaims });
  }
);

usersRouter.get(
  '/profile',
  async function (req, res, next) {
      next();
  }
);
