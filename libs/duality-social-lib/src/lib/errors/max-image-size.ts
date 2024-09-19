import { AppConstants } from "../constants";

export class MaxImageSizeError extends Error {
    constructor(size: number) {
        super(`Image size (${size}) exceeds the maximum allowed size of ${AppConstants.MaxImageSize}.`);
        Object.setPrototypeOf(this, MaxImageSizeError.prototype);
    }
}