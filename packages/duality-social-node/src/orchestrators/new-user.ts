import { Orchestrator } from './base';
import { UserService } from '../services/user';
import { UserResponseTransformer } from '../transformers/user-response';

export class NewUserOrchestrator extends Orchestrator {
    override async execute(email: string, username: string, password: string) {
        const hashedPassword = await UserService.encryptUserPassword(password);
        const user = await UserService.newUser(email, username, hashedPassword)
        const newVerifcation = await UserService.newEmailValidation(user, email);
        const transformedUser = UserResponseTransformer.transform(user);
        // TODO: Send verification email
        return {
            user,
            newVerifcation,
            transformedUser,
        }
    }
}