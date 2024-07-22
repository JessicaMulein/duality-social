// utils/userUtils.ts
import { Document } from 'mongoose';
import validator from 'validator';
import { AccountStatusTypeEnum, BaseModel, EmailChangeDocument, IEmailChange, IUser, LockTypeEnum, ModelName, UserDocument } from '@duality-social/duality-social-lib';
import { InvalidEmail } from '../errors/invalidEmail';
import { InvalidPassword } from '../errors/invalidPassword';
import { EmailExistsError } from '../errors/emailExists';
import { UsernameExistsError } from '../errors/usernameExists';
import { compare } from 'bcrypt';

const UserModel = BaseModel.getModel<UserDocument>(ModelName.User);
const EmailChangeModel = BaseModel.getModel<EmailChangeDocument>(ModelName.EmailChange);

export class UserService {
  public static async register(
    email: string,
    username: string,
    password: string
  ): Promise<Document<unknown, object, IUser>> {
    // Email validation using validator.js
    if (!validator.isEmail(email)) {
      throw new InvalidEmail(email);
    }

    if (await UserModel.findOne({ email: email })) {
        throw new EmailExistsError(email);
    }

    if (await UserModel.findOne({ username: username })) {
      throw new UsernameExistsError(username);
    }

    // Password validation: Here, we'll use validator.js for the email,
    // and keep the previous logic for password. Adjust this logic if needed.
    if (
      !password ||
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[A-Za-z]/.test(password)
    ) {
      throw new InvalidPassword(
        'Password must be at least 8 characters long and contain both letters and numbers'
      );
    }

    try {
      // Register user in local MongoDB
      const newUser = await UserModel.create({
        email: email,
        username: username,
        accountStatusType: AccountStatusTypeEnum.NewUnverified,
        lockStatus: LockTypeEnum.PendingEmailVerification,
        shadowBan: false,
        userHidden: true,
      });

      // create email registration token
      await EmailChangeModel.create({
        userId: newUser._id,
        email: email,
      });

      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  // Add this login method to UserService.ts
  public static async login(email: string, password: string): Promise<any> {
    // Validate email
    if (!validator.isEmail(email)) {
      throw new InvalidEmail(email);
    }

    // Attempt to find the user by email
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }

    // Here, you should compare the provided password with the stored hash.
    // This is a placeholder for password comparison logic, e.g., using bcrypt.
    const isMatch = await compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Assuming the password matches, return the user (excluding the password hash)
    const { passwordHash, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
}
