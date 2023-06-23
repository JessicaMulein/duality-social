import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public readonly title = 'Duality Social';
  public isAuthenticated = false;
  public userLoggedIn = false;
  public isIframe = false; 
  private readonly _destroying$ = new Subject<void>();

  constructor(private keycloakService: KeycloakService) {}

  private runningInIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  ngOnInit(): void {
    this.isIframe = this.runningInIframe();
    this.updateUserLoggedIn();
  }

  async updateUserLoggedIn() {
    console.log('updateUserLoggedIn');
    this.userLoggedIn = await this.keycloakService.isLoggedIn();
  }

  async login() {
    await this.keycloakService.login();
  }

  async logout() {
    await this.keycloakService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}