import { AppConstants } from '../constants.ts';
import { ValidationError } from './validation-error.ts';

export class ContentTooLongError extends ValidationError {
  constructor(length: number) {
    super(
      `Content is too long (${length}). Maximum length is ${AppConstants.MaxBlogPostLength} characters.`,
    );
    this.name = 'ContentTooLongError';
    Object.setPrototypeOf(this, ContentTooLongError.prototype);
  }
}
