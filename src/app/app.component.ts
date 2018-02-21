import { Component } from '@angular/core';
import {NotificationService} from './shared/messages/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private nf: NotificationService) { }

  Notifty(msg: string) {
    this.nf.notify(msg);
  }
}
