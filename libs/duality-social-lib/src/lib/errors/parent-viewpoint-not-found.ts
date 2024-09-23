import { ValidationError } from './validation-error.ts';

export class ParentViewpointNotFoundError extends ValidationError {
  constructor(parentViewpointId: string) {
    super(`Parent viewpoint not found: ${parentViewpointId}`);
    this.name = 'ParentPostNotFoundError';
    Object.setPrototypeOf(this, ParentViewpointNotFoundError.prototype);
  }
}
