import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { AccountLoginTypeEnum, AccountStatusTypeEnum, IUser, LockTypeEnum } from '@duality-social/duality-social-lib';
import { Schema } from 'mongoose';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  loading!: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private http: HttpClient,
    private notificationService: NotificationService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Duality Social - Login');
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(savedUserEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new UntypedFormControl('', Validators.required),
      rememberMe: new UntypedFormControl(savedUserEmail !== null),
    });
  }

  emailFlowLogin() {
    throw new Error('Method not implemented.');
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;
    this.loading = true;
    // POST to /user/login
    this.http.post(`${environment.domainName}/users/login`, {
      email,
      password,
      rememberMe,
    }).subscribe(
      (response: any) => {
        console.log('response', response);
        this.loading = false;
        this.authenticationService.setSession(response);
        this.router.navigate(['/']);
      }
    );
  }

  /**
   * @param account
   */
  public async msasFlowLogin(): Promise<void> {
    this.loading = true;
    try {
      const accessToken = await this.authenticationService.getAccessToken();

      console.log('accessToken', accessToken);
      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        try {
          const response$ = this.http.post(
            `${environment.domainName}/users/login`,
            { headers },
          );

          const response = await lastValueFrom(response$);
          console.log('User created in MongoDB:', response);
        } catch (error) {
          console.error('Error creating user in MongoDB:', error);
        } finally {
          this.loading = false;
        }
      }
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  }

  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }
}