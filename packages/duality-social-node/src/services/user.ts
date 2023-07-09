import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Request } from 'express';
import { IUser, LockStatus, LoginFailureReason, User, EmailVerification, emailVerificationValidHours, IEmailVerification } from '@duality-social/duality-social-lib';
import { LoginService } from './login';

export class UserService {
    static async findByUsername(username: string): Promise<IUser> {
        return User.findOne({ username: username });
    }

    static async findByEmail(email: string): Promise<IUser> {
        return User.findOne({ email: email });
    }

    static async validateUserPassword(user: IUser, password: string): Promise<boolean> {
        return await bcrypt.compare(
            password,
            user.password
        );
    }

    static async encryptUserPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    static async newUser(username: string, email: string, password: string, tz?: string): Promise<IUser> {
        const now = new Date();
        const user = new User({
            username: username,
            email: email,
            lockExpiration: undefined,
            lockStatus: LockStatus.UnverifiedEmail,
            password: password,
            tz: tz,
            createdAt: now,
            updatedAt: now
        });
        await user.save();
        return user;
    }

    static convertUserDate(user: IUser, date: Date): Date {
        if (user.tz) {
            return new Date(date.toLocaleString('en-US', { timeZone: user.tz }));
        } else {
            return date;
        }
    }

    static async newEmailValidation(user: IUser, email: string): Promise<IEmailVerification> {
        const now = new Date();
        const newEmail = new EmailVerification({
            user: user._id,
            email: email,
            token: randomBytes(32).toString('hex'),
            createdAt: now,
            expiresAt: new Date(now.getTime() + emailVerificationValidHours * 60 * 60 * 1000)
        });
        await newEmail.save();
        return newEmail;
    }

    static async findEmailValidationByToken(token: string): Promise<IEmailVerification | undefined> {
        const now = new Date();
        const verification = await EmailVerification.findOne({ token: token, expiresAt: { $gt: now } });
        if (!verification) {
            return;
        }
        return verification;
    }

    static async hasValidationInProgress(user: IUser, email: string): Promise<boolean> {
        const now = new Date();
        const verification = await EmailVerification.findOne({ user: user._id, email: email, expiresAt: { $gt: now } });
        if (!verification) {
            return false;
        }
        await EmailVerification.deleteMany({ user: user._id, expiresAt: { $lt: now } });
        return true;
    }

    static async validateEmail(token: string): Promise<IUser | undefined> {
        const now = new Date();
        const verification = await EmailVerification.findOne({ token: token });
        if (!verification) {
            return;
        }
        if (verification.expiresAt < now) {
            await EmailVerification.deleteMany({ user: verification.user, expiresAt: { $lt: now } });
            return;
        }
        const user = await User.findById(verification.user);
        if (!user) {
            return;
        }
        user.email = verification.email;
        if (user.lockStatus === LockStatus.UnverifiedEmail) {
            user.lockStatus = LockStatus.Unlocked;
            user.lockExpiration = undefined;
        }
        user.updatedAt = now;
        await user.save();
        await EmailVerification.deleteMany({ user: user._id });
        return user;
    }

    static async saveLogin(user: IUser, req: Request, failureReason?: LoginFailureReason) {
        const now = new Date();

        await LoginService.saveLogin(user, req, failureReason);
        try {
            if (failureReason === undefined) {
                user.lastLogin = now;
            } else {
                user.lastFailedLogin = new Date();
            }
            await user.save();
        }
        catch (error) {
            console.error('Error saving user:', error);
        }
    }
}