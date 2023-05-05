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
  
  private _isAnonymous: boolean|undefined = undefined;
  private realmApp: App;
  private _redirectUrl: string = environment.realm.redirectUri;

  public get redirectUrl(): string {
    return this._redirectUrl;
  }

  public set redirectUrl(value: string) {
    console.log('set redirectUrl', value);
    this._redirectUrl = value;
  }
  
  constructor(private http: HttpClient) {
    this.realmApp = new App({ id: environment.realm.appId });
  }

  public get isAnonymous(): boolean {
    return this._isAnonymous === true;
  }

  public get loggedIn(): boolean {
    return this.realmApp.currentUser !== null;
  }

  public get redirectUri(): string {
    return environment.realm.redirectUri;
  }

  public async loginAnonymous(): Promise<boolean> {
    try {
      const user = await this.realmApp.logIn(Realm.Credentials.anonymous());
      this._isAnonymous = user ? true : false;
      return this._isAnonymous;
    } catch (error) {
      console.error('Failed to log in', error);
      this._isAnonymous = false;
      return false;
    }
  }

  public async loginGoogle(authCode: string): Promise<boolean> {
    try {
      const credentials = Realm.Credentials.google({
        authCode: authCode
      });
      const user = await this.realmApp.logIn(credentials);
      return user ? true : false;
    } catch (error) {
      console.error('Failed to log in', error);
      return false;
    }
  }

  public async loginFacebook(accessToken: string): Promise<boolean> {
    try {
      const credentials = Realm.Credentials.facebook(accessToken);
      const user = await this.realmApp.logIn(credentials);
      return user ? true : false;
    } catch (error) {
      console.error('Failed to log in', error);
      return false;
    }
  }

  public async loginEmail(email: string, password: string): Promise<boolean> {
    let _error;
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await this.realmApp.logIn(credentials);
      if (user) {
        this._isAnonymous = false;
        return true;
      }
    } catch (error) {
      _error = error;
    }
    console.error('Failed to log in', _error);
    return false;
  }

  public async registerUser(email: string, password: string): Promise<boolean> {
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

  public async logout(): Promise<void> {
    if (this.realmApp.currentUser) {
      await this.realmApp.currentUser.logOut();
      this._isAnonymous = undefined;
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

  getCurrentUser(): User | null {
    const account = this.realmApp.currentUser;
    return account ? (account as User) : null;
  }
}
