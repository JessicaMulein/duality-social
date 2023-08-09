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
import { FailedComponent } from '../failed/failed.component';
import { environment } from '../environments/environment';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LoggerModule } from 'ngx-logger';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; // Remove this line to use Angular Universal

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
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
