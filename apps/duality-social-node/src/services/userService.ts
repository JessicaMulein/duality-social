// utils/userUtils.ts
import { Document } from 'mongoose';
import validator from 'validator';
import { AccountStatusTypeEnum, AdminLevelEnum, BaseModel, IEmailChange, IUser, LockTypeEnum, ModelName } from '@duality-social/duality-social-lib';
import { InvalidEmail } from '../errors/invalidEmail';
import { InvalidPassword } from '../errors/invalidPassword';
import { EmailExistsError } from '../errors/emailExists';
import { UsernameExistsError } from '../errors/usernameExists';
import { managementClient } from '../auth0';
import { environment } from '../environment';

const UserModel = BaseModel.getModel<IUser>(ModelName.User);
const EmailChangeModel = BaseModel.getModel<IEmailChange>(ModelName.EmailChange);

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
      // Register user in Auth0
      const auth0User = await managementClient.createUser({
        connection: environment.auth0.database,
        email: email,
        username: username,
        password: password,
        user_metadata: {
          /* any user metadata */
        },
      });

      // Register user in local MongoDB
      const newUser = await UserModel.create({
        email: email,
        username: auth0User.username,
        auth0Id: auth0User.user_id,
        accountStatusType: AccountStatusTypeEnum.NewUnverified,
        adminFreezeType: LockTypeEnum.PendingEmailVerification,
        adminLevel: AdminLevelEnum.User,
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
}
