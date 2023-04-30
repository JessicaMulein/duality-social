import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PublicClientApplication,
  AuthenticationResult,
  AccountInfo,
} from '@azure/msal-browser';
import { Observable, from, of } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface User extends AccountInfo {
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private msalClient: PublicClientApplication;

  constructor(private http: HttpClient) {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    this.msalClient = new PublicClientApplication({
      auth: {
        clientId: environment.msal.clientId,
        authority: environment.msal.authority,
        redirectUri: environment.msal.redirectUri,
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
      },
    });
  }

  login(): Observable<boolean> {
    return from(
      this.msalClient.loginPopup({
        scopes: ['openid', 'profile', 'email', 'User.Read'],
      })
    ).pipe(
      map((result: AuthenticationResult) => {
        if (result) {
          this.msalClient.setActiveAccount(result.account);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): Observable<void> {
    return from(this.msalClient.logout()).pipe(map(() => {}));
  }

  passwordReset(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): any {
    // TODO implement on backend
    return of(true).pipe(delay(1000));
  }

  passwordResetRequest(email: string) {
    // TODO implement on backend // deduplicate from above?
    return this.http.post(
      `${environment.domainName}/api/password-reset/request`,
      { email }
    );
  }

  // getAccessToken(): Observable<string> {
  //   console.log('getAccessToken()');
  //   return from(
  //     this.msalClient.acquireTokenSilent({
  //       scopes: ['openid', 'profile', 'email', 'User.Read'],
  //     })
  //   ).pipe(map((result: AuthenticationResult) => {
  //     console.log('getAccessToken() in pipe(map()) result', result, result.accessToken);
  //     return result.accessToken
  //   }));
  // }

  getAccessToken(): Promise<string> {
    return this.msalClient.acquireTokenSilent({
      scopes: ['User.Read'],
    }).then((result: AuthenticationResult) => {
        console.log('Got token response...', result);
        const accessToken = result.accessToken;
        if (accessToken) {
          console.log('Got access token...', accessToken);
          return accessToken;
        } else {
          console.log('No access token...');
          throw new Error('Unable to acquire access token');
        }
      });
  }

  getCurrentUser(): User | null {
    const account = this.msalClient.getActiveAccount();
    return account ? (account as User) : null;
  }
}
