import { ValidationError } from './validation-error.ts';

export class ParentPostNotFoundError extends ValidationError {
  constructor(parentPostId: string) {
    super(`Parent post not found: ${parentPostId}`);
    this.name = 'ParentPostNotFoundError';
    Object.setPrototypeOf(this, ParentPostNotFoundError.prototype);
  }
}
