// define an angular service that will be used to communicate with the pusher API
/*
      // Enable pusher logging - don't include this in production
      // TODO: Remove this
      Pusher.logToConsole = true;
      var pusher = new Pusher('eeb22df2aaa65ce1ede4', {
        cluster: 'us3'
      });
      var channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
        alert(JSON.stringify(data));
      });
      */
// pusher.service.ts
import { Injectable } from '@angular/core';
import * as Pusher from '@pusher/push-notifications-web';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private pusher: Pusher.Client;

  constructor() {
    this.pusher = new Pusher.Client({
      instanceId: environment.pusher.key,
    });
  }

  async subscribe(interest: string): Promise<void> {
    try {
      await this.pusher.start();
      await this.pusher.addDeviceInterest(interest);
    } catch (error) {
      console.error('Error subscribing to interest:', error);
    }
  }

  async unsubscribe(interest: string): Promise<void> {
    try {
      await this.pusher.removeDeviceInterest(interest);
    } catch (error) {
      console.error('Error unsubscribing from interest:', error);
    }
  }
}
