import express, { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import {
    emailAlreadyRegisteredMessage,
    emailRequiredInvalidMessage,
    passwordInvalidMessage,
    passwordMinLength,
    userCreationErrorMessage,
    userIncorrectMessage,
    usernameInvalidMessage,
    usernameMinLength,
    usernameTakenMessage,
    emailValidationInProgressMessage,
} from '@duality-social/duality-social-lib';
import { UserService } from '../services/user';
import { NewUserOrchestrator } from '../orchestrators/new-user';

const authRouter: Router = express.Router();

authRouter.get('/check-authentication', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

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
            const orchestractionResults = await new NewUserOrchestrator().execute(req.body.username, req.body.email, req.body.password);
            res.status(201).json(orchestractionResults.transformedUser);
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
