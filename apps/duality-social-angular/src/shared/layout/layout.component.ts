import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, Inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject, timer } from 'rxjs';
import { Subscription } from 'rxjs';
import { OAuthService, OAuthEvent, OAuthErrorEvent, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;
  public showSpinner = false;
  public username = 'Log In';
  public isAdmin = false;
  public userLoggedInDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  public newPostVisible = false;

  private autoLogoutSubscription: Subscription = new Subscription();

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public spinnerService: SpinnerService,
    public oauthService: OAuthService,
    public router: Router
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  public showNewPost() {
    this.newPostVisible = true;
    this.router.navigate(['feed'], {
      queryParams: { newPost: true },
    });
  }

  public hideNewPost() {
    this.newPostVisible = false;
  }

  ngOnInit(): void {
    this.isAdmin = false;

    if (this.oauthService.hasValidAccessToken()) {
      this.username = this.oauthService.getIdentityClaims()['name'] ?? 'Unknown User';
    } else {
      this.username = '';
      this.userLoggedInDisplay = false;
    }

    this.oauthService.events.subscribe((event: OAuthEvent) => {
      switch (event.type) {
        case 'token_received':
          this.userLoggedInDisplay = true;
          this.username = this.oauthService.getIdentityClaims()['name'] ?? 'Unknown User';
          break;
        case 'token_expires':
        case 'token_error':
          this.username = '';
          this.userLoggedInDisplay = false;
          break;
      }
    });
    
    this.setLoginDisplay();
  }

  setLoginDisplay() {
    this.userLoggedInDisplay = this.oauthService.hasValidAccessToken();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
    this._destroying$.next();
    this._destroying$.complete();
  }  

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}