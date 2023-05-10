import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { App, User as RealmUser } from 'realm-web';
import { Observable, from, of } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface User extends RealmUser {
  isAdmin: boolean;
}

interface IError {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  private _isAnonymous: boolean|undefined = undefined;
  private realmApp: App;
  private user: User | null;
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
    this.user = null;
  }

  public get isAnonymous(): boolean {
    return this._isAnonymous === true;
  }

  public get loggedIn(): Observable<boolean> {
    return of(this.user !== null);
  }

  public get redirectUri(): string {
    return environment.realm.redirectUri;
  }

  public async loginAnonymous(): Promise<boolean> {
    try {
      const user = await this.realmApp.logIn(Realm.Credentials.anonymous());
      this._isAnonymous = user ? true : false;
      console.log('anonymous user', user);
      this.user = user as User;
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
      console.log('google user', user);
      this.user = user as User;
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
      console.log('facebook user', user);
      this.user = user as User;
      return user ? true : false;
    } catch (error) {
      console.error('Failed to log in', error);
      return false;
    }
  }

  public loginEmail(email: string, password: string): Observable<boolean | string> {
    return from(this._loginEmail(email, password));
  }
  
  public async _loginEmail(email: string, password: string): Promise<boolean | string> {
    try {
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await this.realmApp.logIn(credentials);
      console.log("email user", user);
      if (user) {
        this._isAnonymous = false;
        this.user = user as User;
        return true;
      }
    } catch (error: unknown) {
      console.error('Failed to log in', error);
      return ((error as IError).message) ?? false;
    }
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
      this.user = null;
    }
  }

  passwordReset(
    token: string,
    tokenId: string,
    password: string,
    confirmPassword: string
  ): Observable<boolean> {
    if (password != confirmPassword) {
      return of(false);
    }
    this.realmApp.emailPasswordAuth.resetPassword({
      token: token,
      tokenId: tokenId,
      password: confirmPassword,
    });
    return of(true);
  }

  passwordResetRequest(email: string): Observable<boolean> {
    // TODO implement on backend // deduplicate from above?
    this.realmApp.emailPasswordAuth.sendResetPasswordEmail({
      email: email
    });
    return of(true);
  }

  get currentUser(): Observable<User | null> {
    let _user = this.user;
    if (_user === null) {
      _user = this.getCurrentUser();
    }
    return of(this.user);
  }

  getCurrentUser(): User | null {
    const account = this.realmApp.currentUser;
    this.user = account ? (account as User) : null 
    return this.user;
  }
}
