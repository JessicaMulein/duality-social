import { Request } from "express";
import {
  ILogin,
  IUser,
  Login,
  LoginFailureReason,
} from "@duality-social/duality-social-lib";

export class LoginService {
  static async saveLogin(
    user: IUser,
    req: Request,
    reason?: LoginFailureReason
  ): Promise<ILogin> {
    const login = new Login({
      user: user._id,
      agent: req.headers["user-agent"],
      ip: req.ip,
      failureReason: reason,
      success: reason === undefined,
      createdAt: new Date(),
    });
    await login.save();
    return login;
  }
}