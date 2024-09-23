import { ValidationError } from './validation-error.ts';

export class ContentEmptyError extends ValidationError {
  constructor() {
    super('Content cannot be empty');
    this.name = 'ContentEmptyError';
    Object.setPrototypeOf(this, ContentEmptyError.prototype);
  }
}
