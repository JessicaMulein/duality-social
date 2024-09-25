import { Types } from 'mongoose';

export interface IHasUpdater {
  /**
   * The MongoDB unique identifier for the user who updated the object.
   */
  updatedBy: Types.ObjectId;
}
