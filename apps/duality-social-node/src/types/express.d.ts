import { UserDocument } from '@duality-social/duality-social-lib';

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument;
        }
    }
}