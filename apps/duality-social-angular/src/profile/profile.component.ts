import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProfile } from '@duality-social/duality-social-lib';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me'; // Prod graph endpoint. Uncomment to use.
//const GRAPH_ENDPOINT = 'https://graph.microsoft-ppe.com/v1.0/me';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile!: IProfile;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile as IProfile;
      });
  }
}