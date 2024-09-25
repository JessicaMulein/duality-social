import { Types } from 'mongoose';

export interface IHasSoftDeleter {
  /**
   * The MongoDB unique identifier for the user who deleted the object.
   */
  deletedBy?: Types.ObjectId;
}
