import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { IDevilsAdvocateRequest, IDevilsAdvocateResponse } from '@duality-social/duality-social-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  constructor(private oauthService: OAuthService) { }

  ngOnInit(): void {
    this.oauthService.events
      .pipe(
        filter((event) => event.type === 'token_received'),
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.oauthService.hasValidAccessToken();
  }
}