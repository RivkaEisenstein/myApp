import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/notifications/messaging.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  title = 'notifications';
  message
  constructor(private messagingService: MessagingService) { 
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }

  ngOnInit() {}

}
