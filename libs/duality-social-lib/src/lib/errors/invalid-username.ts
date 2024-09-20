import { AppConstants } from "../constants.ts";

export class InvalidUsernameError extends Error {
    constructor() {
        super(AppConstants.UsernameRegexError);
        this.name = 'InvalidUsernameError';
        Object.setPrototypeOf(this, InvalidUsernameError.prototype);
    }
}