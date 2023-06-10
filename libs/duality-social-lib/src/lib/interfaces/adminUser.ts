import { IUser } from "./user";

export interface IAdminUser extends IUser {
    isAdmin: boolean;
    lastSudo?: Date;
    lastFailedSudo?: Date;
    sudoHash: string;
    sudoHashSalt: string;
    get canSudo(): boolean;
  }

  export type AdminUserKeys = { [P in keyof IAdminUser]: P }[keyof IAdminUser];
  