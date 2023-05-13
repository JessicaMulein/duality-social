import { HttpClient, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private httpClient: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authToken = this.authService.getCurrentUser()?.accessToken;

    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return next.handle(authReq);
    } else {
      // User not logged in, use anonymous login
      return from(this.authService.loginAnonymous()).pipe(
        switchMap(async (loggedIn) => {
          if (loggedIn) {
            const currentUser = await this.authService.getCurrentUser();
            const authReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${currentUser?.accessToken}`,
              },
            });

            return next.handle(authReq);
          } else {
            return next.handle(req);
          }
        })
      );
    }
  }
}
