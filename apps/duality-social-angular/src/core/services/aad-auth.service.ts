import { Injectable, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';
import { Router } from '@angular/router';
import { EventMessage, EventType } from '@azure/msal-browser';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AADAuthService implements OnDestroy {
    redirectUrl: string;
    subscriptions: Subscription[] = [];

    isIframe = false;
    _loggedIn = false;
    get loggedIn() {
        return this._loggedIn;
    }
    set loggedIn(val: boolean) {
        this._loggedIn = val;
        this.userAuthChanged(val);
    }

    @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private msalBroadcastService: MsalBroadcastService,
        private router: Router,
        private msalAuthService: MsalService,
    ) {
        this.init();
        this.redirectUrl = environment.msal.redirectUri;
    }

    private userAuthChanged(status: boolean) {
        this.authChanged.emit(status); // Raise changed event
    }

    init() {
        this.isIframe = window !== window.parent && !window.opener;

        this.checkAccount();

        this.subscriptions.push(
            this.msalBroadcastService.msalSubject$.subscribe((evt: EventMessage) => {
                switch (evt.eventType) {
                    case EventType.LOGIN_SUCCESS:
                        this.checkAccount();
                        if (this.loggedIn) {
                            console.log('LOGIN SUCCESS!');
                            this.router.navigate(['/']);
                        }
                        break;
                    case EventType.LOGIN_FAILURE:
                        console.log('LOGIN FAILURE:', evt.error);
                        break;
                }
            })
        );

        this.msalAuthService.handleRedirectObservable().subscribe({
            next: (result) => {
                console.log('Redirect Success: ', result.accessToken);
            },
            error: (error) => {
                console.error('Redirect Error: ', error.errorMessage);
            },
        });
    }

    checkAccount() {
        this.loggedIn = !!this.msalAuthService.instance.getAllAccounts()[0];
    }

    async login() {
        const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
        const authParams = {
            scopes: ['user.read', 'openid', 'profile'],
        };

        if (isIE) {
            this.msalAuthService.loginRedirect(authParams);
        } else {
            // msal events above will fire based on success or failure
            await this.msalAuthService.loginPopup(authParams);
        }
    }

    logout() {
        this.msalAuthService.logout();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
