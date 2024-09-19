export class ImageUploadError extends Error {
    constructor(error: unknown) {
        super('Error uploading image to s3.');
        this.name = 'ImageUploadError';
        this.cause = error instanceof Error ? error : new Error(String(error));
        Object.setPrototypeOf(this, ImageUploadError.prototype);
    }
}