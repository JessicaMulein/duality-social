import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';
import { AuthenticationService } from '../core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public readonly title = 'Duality Social';
  public isIframe = false;
  public isAuthenticated = false;
  public userLoggedIn = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    public authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
    this.updateUserLoggedIn();
  }

  updateUserLoggedIn() {
    this.userLoggedIn = this.authService.loggedIn;
  }

  loginRedirect() {
    throw new Error('Not implemented');
  }

  loginPopup() {
    throw new Error('Not implemented');
  }

  logout(popup?: boolean) {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
