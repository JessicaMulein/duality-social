import { AppConstants } from '../constants.ts';
import { ValidationError } from './validation-error.ts';

export class InvalidImageDimensionError extends ValidationError {
  constructor(width: number, height: number) {
    super(
      `Invalid image dimensions: width=${width}, height=${height} exceeds maximum allowed dimensions of ${AppConstants.MaxImageDimensions.width}x${AppConstants.MaxImageDimensions.height}px.`,
    );
    this.name = 'InvalidImageDimensionError';
    Object.setPrototypeOf(this, InvalidImageDimensionError.prototype);
  }
}
