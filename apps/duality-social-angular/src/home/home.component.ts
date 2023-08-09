import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { IDevilsAdvocateRequest, IDevilsAdvocateResponse } from '@duality-social/duality-social-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginDisplay = false;

  constructor(private http: HttpClient) { }

}
