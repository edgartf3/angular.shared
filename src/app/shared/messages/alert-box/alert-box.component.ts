import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import {NotificationService} from '../notification.service';
import {Observable} from 'rxjs/Observable';
import {delay} from "rxjs/operators";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css'],
  animations: [
    trigger('box-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})

export class AlertBoxComponent implements OnInit {

  message: string;
  title: string;
  alertType: number;
  visible: boolean;
  boxVisibility: string = 'hidden';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.alertboxNotifier
      .do(message => {
        this.message = message.message;
        this.title = message.title;
        this.alertType = message.alertType;
        this.visible = true;
        setTimeout(() => { this.boxVisibility = 'visible'; }, 100);
      }).switchMap(message => Observable.timer(10000))
      .subscribe(timer => {
        this.boxVisibility = 'hidden';
        setTimeout(() => { this.visible = false; }, 500);
      });
  }

  getCSSAlertType() {
    switch (this.alertType) {
      case 1: return 'alert-danger';
      case 2: return 'alert-info';
      case 3: return 'alert-warning';
      case 4: return 'alert-success';
      default: return 'alert-danger';
    }
  }
  close() {
    this.visible = false;
  }

  GetBody(): string {
    if (!isNullOrUndefined(this.message)) {
      let str = this.message;
      let i = 0;
      while ((i = str.indexOf('\n', i)) !== -1) {
        str = str.replace('\n', '<br>');
      }
      return str;
    } else {
      return '';
    }
  }
}
