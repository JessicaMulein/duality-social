import { ValidationError } from './validation-error.ts';

export class ParentPostIdMismatchError extends ValidationError {
  constructor(parentPostId: string, parentViewpointId: string) {
    super(
      `Parent post ID "${parentPostId}" does not match the parent viewpoint's post ID "${parentViewpointId}"`,
    );
    this.name = 'ParentPostIdMismatch';
    Object.setPrototypeOf(this, ParentPostIdMismatchError.prototype);
  }
}
