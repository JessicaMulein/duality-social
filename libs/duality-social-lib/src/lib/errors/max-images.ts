import { AppConstants } from '../constants';
import { ValidationError } from './validation-error';

export class MaxImagesError extends ValidationError {
  constructor(count: number) {
    super(
      `Maximum ${AppConstants.MaxPostImages} images allowed, but ${count} were provided.`,
    );
    this.name = 'MaxImagesError';
    Object.setPrototypeOf(this, MaxImagesError.prototype);
  }
}
