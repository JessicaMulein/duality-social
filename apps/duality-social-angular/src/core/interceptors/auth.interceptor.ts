import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  writeUser(token: string, user: any) {
    console.log('writeUser', token, user);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authToken = this.authService.getCurrentUser()?.accessToken;

    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      this.writeUser(authToken, this.authService.getCurrentUser());
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

            this.writeUser(currentUser?.accessToken??'', currentUser);
            return next.handle(authReq);
          } else {
            return next.handle(req);
          }
        })
      );
    }
  }
}
