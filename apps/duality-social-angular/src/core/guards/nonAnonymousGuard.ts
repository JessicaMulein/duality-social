import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/auth.service";

@Injectable()
export class NonAnonymousGuard {
    constructor(private authService: AuthenticationService) { }

    canActivate() {
        return this.authService.getCurrentUser() !== null && !this.authService.isAnonymous;
    }
}