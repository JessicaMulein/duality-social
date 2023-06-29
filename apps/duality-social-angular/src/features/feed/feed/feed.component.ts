import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {

  constructor(private notificationService: NotificationService,
    private titleService: Title,
    private logger: NGXLogger) {
  }

  ngOnInit() {
    this.titleService.setTitle('Duality Social - Feed');
    this.logger.log('Feed loaded');

    setTimeout(() => {
      this.notificationService.openSnackBar('Welcome!');
    });
  }
}
