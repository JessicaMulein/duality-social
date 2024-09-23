import { AppConstants } from '../constants.ts';
import { ValidationError } from './validation-error.ts';

export class MaxImageSizeError extends ValidationError {
  constructor(size: number) {
    super(
      `Image size (${size}) exceeds the maximum allowed size of ${AppConstants.MaxImageSize}.`,
    );
    Object.setPrototypeOf(this, MaxImageSizeError.prototype);
  }
}
