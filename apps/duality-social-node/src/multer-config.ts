import { AppConstants } from '@duality-social/duality-social-lib';
import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: AppConstants.MaxImageSize,
    files: AppConstants.MaxPostImages,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'));
    }
  },
});
