import { Injectable, Output, EventEmitter, OnDestroy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class KeycloakAuthService {
  private _loggedIn = false;
  get loggedIn() {
    return this._loggedIn;
  }
  set loggedIn(val: boolean) {
    this._loggedIn = val;
    this.userAuthChanged(val);
  }

  @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private keycloakService: KeycloakService) {}

  private userAuthChanged(status: boolean) {
    this.authChanged.emit(status); // Raise changed event
  }

  async login() {
    await this.keycloakService.login();
  }

  async handleRedirect() {
    this._loggedIn = await this.keycloakService.isLoggedIn();
  }

  async checkAccount() {
    this._loggedIn = await this.keycloakService.isLoggedIn();
  }

  async logout() {
    await this.keycloakService.logout();
  }
}