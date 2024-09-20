import { AppConstants } from '../constants.ts';

export class InvalidPasswordError extends Error {
  constructor() {
    super(AppConstants.PasswordRegexError);
    this.name = 'InvalidPassword';
    Object.setPrototypeOf(this, InvalidPasswordError.prototype);
  }
}
