import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, SilentRequest } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { IDevilsAdvocateRequest, IDevilsAdvocateResponse } from '@duality-social/duality-social-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private http: HttpClient) { }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })

  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

}
