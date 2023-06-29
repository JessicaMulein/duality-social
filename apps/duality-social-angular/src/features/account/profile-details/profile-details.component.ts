import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent implements OnInit {
  fullName = '';
  email = '';
  alias = '';

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.fullName = this.authService.getCurrentUser()?.givenName ?? '';
    this.email = this.authService.getCurrentUser()?.username ?? '';
  }
}
