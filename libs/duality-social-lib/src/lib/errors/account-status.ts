import { AccountStatusTypeEnum } from '../enumerations/account-status-type.ts';

export class AccountStatusError extends Error {
  constructor(accountStatus: AccountStatusTypeEnum) {
    super(`Account status is ${accountStatus}`);
    this.name = 'AccountStatusError';
    Object.setPrototypeOf(this, AccountStatusError.prototype);
  }
}
