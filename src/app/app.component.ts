import { Component } from '@angular/core';
import {NotificationService} from './shared/messages/notification.service';
import {ModalService} from "./shared/messages/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  msg = 'Digite sua mensagem aqui!';
  constructor(private notificationService: NotificationService,
              private modalService: ModalService) { }

  Erro() {
    this.modalService.MessageBoxErro(this.msg);
  }

  Info() {
    this.modalService.MessageBoxInfo(this.msg);
  }

  SimNao() {
    this.modalService.MessageBoxSimNao(this.msg, () => {console.log('Clicou no sim'); }, () => {console.log('Clicou no não'); });
  }
  Toast() {
    this.notificationService.notify(this.msg);
  }
  AlertBoxErro() {
    this.notificationService.AlertBoxError(this.msg);
  }
  AlertBoxInfo() {
    this.notificationService.AlertBoxInformation(this.msg);
  }
  AlertBoxCheck() {
    this.notificationService.AlertBoxCheck(this.msg);
  }

}
