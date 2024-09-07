import { Request } from 'express';

export interface MulterRequest extends Request {
  files: {
    images: Express.Multer.File[]
  }
}