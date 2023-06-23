import express = require('express');
import { Request, Response, Router } from 'express';
import Keycloak from 'keycloak-connect';

import { ensureAuthenticated } from '../auth.middleware';
import { getUserFromDatabase } from '../services/userService';
import { keycloak } from '../setupKeycloak';

interface KeycloakRequest extends Request {
  kauth?: Keycloak.KeycloakAuth;
}


// all routes prefixed with /users
export const usersRouter = Router();

// Commands
// -----
// /users/id
usersRouter.get('/id', keycloak.protect(), function (req: KeycloakRequest, res) {
  const idTokenClaims = req.kauth.grant.access_token.content;
  res.render('id', { idTokenClaims });
});

// /users/profile
usersRouter.get('/profile', keycloak.protect(), async function (req: KeycloakRequest, res, next) {
  try {
    const userId = req.kauth.grant.access_token.content.sub;
    const profile = await getUserFromDatabase(userId);
    res.render('profile', { profile });
  } catch (error) {
    next(error);
  }
});