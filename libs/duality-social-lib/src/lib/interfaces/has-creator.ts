import { Types } from 'mongoose';

export interface IHasCreator {
  /**
   * The MongoDB unique identifier for the user who created the object.
   */
  createdBy: Types.ObjectId;
}
