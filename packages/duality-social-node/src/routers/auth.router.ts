import bcrypt from 'bcrypt';
import express, { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import {
    Request as OAuthRequest,
    Response as OAuthResponse,
} from 'oauth2-server';
import {
    emailAlreadyRegisteredMessage,
    emailRequiredInvalidMessage,
    getLockedMessage,
    passwordInvalidMessage,
    passwordMinLength,
    userCreatedMessage,
    userCreationErrorMessage,
    userIncorrectMessage,
    usernameInvalidMessage,
    usernameMinLength,
    usernameTakenMessage,
    EmailVerification,
    Login,
    LoginFailureReason,
    LockStatus,
    User,
    emailValidationInProgressMessage,
} from '@duality-social/duality-social-lib';
import oauth from '../app/oauth.server';
import { LoginService } from '../services/login';
import { UserService } from '../services/user';

const authRouter: Router = express.Router();

authRouter.post(
    '/login',
    // Validate input
    body('username')
        .isLength({ min: usernameMinLength })
        .withMessage(usernameInvalidMessage),
    body('password')
        .isLength({ min: passwordMinLength })
        .withMessage(passwordInvalidMessage),
    async (req: Request, res: Response) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await UserService.findByUsername(req.body.username);
        if (!user) {
            return res.status(400).json({ message: userIncorrectMessage });
        }

        const validPassword = UserService.validateUserPassword(user, req.body.password);
        if (!validPassword) {
            UserService.saveLogin(user, req, LoginFailureReason.InvalidPassword);
            return res.status(400).json({ message: userIncorrectMessage });
        }

        // check lock status after checking password
        if (user.lockStatus !== '' && user.lockExpiration < new Date()) {
            UserService.saveLogin(user, req, LoginFailureReason.Locked);
            return res
                .status(400)
                .json({ message: getLockedMessage(user.lockStatus) });
        }

        // generate an access token and send it in the headers
        const request = new OAuthRequest(req);
        const response = new OAuthResponse(res);
        try {
            const token = await oauth.token(request, response);

            UserService.saveLogin(user, req);

            // set the authorization header with the token
            res.set('Authorization', `Bearer ${token.accessToken}`);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error generating access token', error });
        }
    }
);

authRouter.post(
    '/register',
    // Validate input
    body('email').isEmail().withMessage(emailRequiredInvalidMessage),
    body('username')
        .isLength({ min: usernameMinLength })
        .withMessage(usernameInvalidMessage),
    body('password')
        .isLength({ min: passwordMinLength })
        .withMessage(passwordInvalidMessage),
    async (req: Request, res: Response) => {
        // Handle validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // verify that the username isn't taken
        const existingUser = await UserService.findByUsername(req.body.username);
        if (existingUser) {
            return res.status(400).json({ message: usernameTakenMessage });
        }

        const existingEmail = await UserService.findByEmail(req.body.email);
        if (existingEmail) {
            return res.status(400).json({ message: emailAlreadyRegisteredMessage });
        }

        try {
            // Hash password
            const hashedPassword = await UserService.encryptUserPassword(req.body.password);

            // Create user
            const user = await UserService.newUser(req.body.email, req.body.username, hashedPassword)
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: userCreationErrorMessage, error });
        }
    }
);

authRouter.post('/change-email',
    body('email').isEmail().withMessage(emailRequiredInvalidMessage),
    body('username')
        .isLength({ min: usernameMinLength })
        .withMessage(usernameInvalidMessage),
    body('password')
        .isLength({ min: passwordMinLength })
        .withMessage(passwordInvalidMessage),
    async (req: Request, res: Response) => {
        const user = await UserService.findByUsername(req.body.username);
        if (!user) {
            return res.status(400).json({ message: userIncorrectMessage });
        }

        if (!UserService.validateUserPassword(user, req.body.password)) {
            return res.status(400).json({ message: userIncorrectMessage });
        }

        if (user.email === req.body.email) {
            return res.status(400).json({ message: emailAlreadyRegisteredMessage });
        }

        const existingVerification = await UserService.hasValidationInProgress(user, req.body.email);
        if (existingVerification) {
            return res.status(400).json({ message: emailValidationInProgressMessage });
        }

        const newVerifcation = await UserService.newEmailValidation(user, req.body.email);
        res.status(201).json({
            email: newVerifcation.email,
            expiresAt: newVerifcation.expiresAt,
        });
});

authRouter.post('/verify-email',
    body('token').isString(),
    async (req: Request, res: Response) => {
        const user = await UserService.validateEmail(req.body.token);
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        return res.status(200).json({
            email: user.email,
            username: user.username,
        });
    });

export default authRouter;
