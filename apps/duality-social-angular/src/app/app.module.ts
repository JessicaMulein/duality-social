import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { ProfileComponent } from '../profile/profile.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { FailedComponent } from '../failed/failed.component';
import { environment } from '../environments/environment';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LoggerModule } from 'ngx-logger';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; // Remove this line to use Angular Universal

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.realm.clientId,
      authority: environment.realm.authority,
      redirectUri: environment.realm.redirectUri,
      postLogoutRedirectUri: environment.realm.postLogoutRedirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['User.Read','email','openid','profile']); // Prod environment. Uncomment to use.
  //protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['User.Read','openid','profile','email']
    },
    loginFailedRoute: '/login-failed'
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    FailedComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule, // Animations cause delay which interfere with E2E tests
    AppRoutingModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    //
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    LoggerModule.forRoot({
      //serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      //serverLogLevel: environment.serverLogLevel
    }),
    //
    HttpClientModule,
    MsalModule.forRoot(
      MSALInstanceFactory(),
      MSALGuardConfigFactory(),
      MSALInterceptorConfigFactory()
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
