import { AccountStatusTypeEnum } from '../enumerations/account-status-type.ts';
import { AccountStatusError } from './account-status.ts';

export class PendingEmailVerificationError extends AccountStatusError {
  constructor() {
    super(AccountStatusTypeEnum.NewUnverified);
    Object.setPrototypeOf(this, PendingEmailVerificationError.prototype);
  }
}
