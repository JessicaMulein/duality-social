import { AccountStatusTypeEnum } from "../enumerations/account-status-type.ts";
import { AccountStatusError } from "./account-status.ts";

export class AccountLockedError extends AccountStatusError {
    constructor() {
            super(AccountStatusTypeEnum.Locked);
            Object.setPrototypeOf(this, AccountLockedError.prototype);
        }
}