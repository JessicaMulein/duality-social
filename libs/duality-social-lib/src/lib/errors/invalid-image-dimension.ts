import { AppConstants } from '../constants.ts';

export class InvalidImageDimensionError extends Error {
  constructor(width: number, height: number) {
    super(
      `Invalid image dimensions: width=${width}, height=${height} exceeds maximum allowed dimensions of ${AppConstants.MaxImageDimensions.width}x${AppConstants.MaxImageDimensions.height}px.`,
    );
    this.name = 'InvalidImageDimensionError';
    Object.setPrototypeOf(this, InvalidImageDimensionError.prototype);
  }
}
