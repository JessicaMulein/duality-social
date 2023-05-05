// https://github.com/microsoft/DevAppsForTeams/blob/30a919d6051282451b89c24b595427184a6ec4e7/CustomerOrdersApp/src/app/core/guards/can-activate.guard.ts
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
/**
 * I think this has been deprecated in favor of the MsalGuard
 */
@Injectable({ providedIn: 'root' })
export class CanActivateGuard{

  constructor(private authService: AuthenticationService, 
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn) {
        return true;
    }

    // Track URL user is trying to go to so we can send them there after logging in
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }

  canActivateFn(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn) {
      return true;
    }
  
    // Track URL user is trying to go to so we can send them there after logging in
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}