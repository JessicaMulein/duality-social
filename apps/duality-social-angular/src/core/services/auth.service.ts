import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App, User as RealmUser } from 'realm-web';
import { Observable, from, of } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface User extends RealmUser {
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private realmApp: App;
  constructor(private http: HttpClient) {
    this.realmApp = new App({ id: environment.realm.appId });
  }

  public get loggedIn(): boolean {
    return this.realmApp.currentUser !== null;
  }

  public get redirectUri(): string {
    return environment.realm.redirectUri;
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await this.realmApp.logIn(credentials);
      return user ? true : false;
    } catch (error) {
      console.error('Failed to log in', error);
      return false;
    }
  }

  async registerUser(email: string, password: string): Promise<boolean> {
    try {
      await this.realmApp.emailPasswordAuth.registerUser({
        email,
        password,
      });
      return true;
    } catch (error) {
      console.error('Failed to register user', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    if (this.realmApp.currentUser) {
      await this.realmApp.currentUser.logOut();
    }
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

  getCurrentUser(): User | null {
    const account = this.realmApp.currentUser;
    return account ? (account as User) : null;
  }
}
