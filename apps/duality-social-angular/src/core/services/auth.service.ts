import { Injectable } from '@angular/core';
import { KeycloakService, KeycloakProfile } from 'keycloak-angular';
import { environment } from '../../environments/environment';
import { IAdminUser, IUser } from '@duality-social/duality-social-lib';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private keycloakService: KeycloakService) {
    this.keycloakService.init({
      config: {
        url: environment.keycloak.issuer,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: []
    });
  }

  async login() {
    await this.keycloakService.login();
  }

  async logout() {
    await this.keycloakService.logout();
  }

  async getAccessToken(): Promise<string> {
    return await this.keycloakService.getToken();
  }

  async getCurrentUser(): Promise<IUser | IAdminUser | null> {
    const userProfile: IUserProfile | null = await this.keycloakService.loadUserProfile();
    if (userProfile) {
      return userProfile['role'] === 'admin' ? { ...userProfile, isAdmin: true } as IAdminUser : userProfile as IUser;
    }
    return null;
  }
}