import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { catchError, mergeMap } from 'rxjs/operators';
import { throwError, from } from 'rxjs';

import { MsalService } from '@azure/msal-angular';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { AuthenticationResult } from '@azure/msal-browser';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private msalService: MsalService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Intercepting request...');
    return from(
      this.msalService.acquireTokenSilent({
        scopes: ['User.Read'],
      })
    ).pipe(
      mergeMap((tokenResponse: AuthenticationResult) => {
        console.log('Got token response...', tokenResponse);
        const accessToken = tokenResponse.accessToken;
        if (accessToken) {
          console.log('Got access token...', accessToken);
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          return next.handle(authReq).pipe(
            catchError((error) => {
              console.log('Got error...', error);
              if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                  this.msalService.logout();
                  this.dialog.closeAll();
                  this.router.navigate(['/auth/login']);
                }
              }

              return throwError(() => error);
            })
          );
        } else {
          console.log('No access token...');
          return next.handle(req);
        }
      })
    );
  }
}
