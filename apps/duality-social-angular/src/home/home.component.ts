import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { IDevilsAdvocateRequest, IDevilsAdvocateResponse } from '@duality-social/duality-social-lib';
import { AuthenticationService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  constructor(private authService: AuthenticationService, private http: HttpClient) { }

  ngOnInit(): void {
    console.log('home.component.ts: ngOnInit()');
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.loggedIn;
  }

}
