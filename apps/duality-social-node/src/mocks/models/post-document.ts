// src/mocks/models/mockIPostDocument.ts

import {
  IPost,
  IPostDocument,
  IPostObject,
} from '@duality-social/duality-social-lib';
import { jest } from '@jest/globals';
import { Types } from 'mongoose';

/**
 * Custom interface for mocking IPostDocument with necessary properties and methods.
 */
export interface MockIPostDocument extends IPostObject {
  /**
   * Mocks the toObject method to return an IPost object with _id.
   */
  toObject: jest.Mock<(options?: any) => IPost & { _id: Types.ObjectId }>;

  /**
   * Mocks the save method to return a Promise resolving to an IPostDocument.
   */
  save: jest.MockedFunction<(options?: any) => Promise<IPostDocument>>;

  // Add other properties or methods as needed
}
