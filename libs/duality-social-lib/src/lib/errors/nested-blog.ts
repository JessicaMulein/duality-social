import { ValidationError } from './validation-error.ts';

export class NestedBlogError extends ValidationError {
  constructor() {
    super('Post cannot be a blog and have a parent post or viewpoint');
    this.name = 'NestedBlogError';
    Object.setPrototypeOf(this, NestedBlogError.prototype);
  }
}
