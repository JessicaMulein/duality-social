import { usernameMinLength, passwordMinLength } from './constants';

export const emailRequiredInvalidMessage = 'Email is required and must be valid';
export const emailAlreadyRegisteredMessage = 'Email is already registered';
export const emailValidationInProgressMessage = 'Email verification already in progress for this email';
export const userCreationErrorMessage = 'Error creating user';
export const usernameInvalidMessage = `Username is required and must be at least ${usernameMinLength} characters long`;
export const usernameTakenMessage = 'Username is already taken';
export const passwordInvalidMessage = `Password is required and must be at least ${passwordMinLength} characters long`;
export const userIncorrectMessage = 'Username or password is incorrect'; 
export const getLockedMessage = (lockStatus: string) => `Your account is locked: ${lockStatus}`;
