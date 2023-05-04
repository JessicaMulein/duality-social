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
    return from(this.authService.getAccessToken()).pipe(
      switchMap((authToken) => {
        console.log('Auth token: ' + JSON.stringify(authToken));
        if (authToken) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          // the first time we get an auth, we need to write the user to the database
          this.writeUser(authToken, this.authService.getCurrentUser());
          return next.handle(authReq);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
