import {EventEmitter, Injectable} from '@angular/core';
import {AlertBoxMessage} from './AlertBoxMessage';

@Injectable()
export class NotificationService {
  notifier = new EventEmitter<string>();
  alertboxNotifier = new EventEmitter<AlertBoxMessage>();

  notify(message: string) {
    this.notifier.emit(message);
  }

  AlertBox(message: AlertBoxMessage) {
    this.alertboxNotifier.emit(message);
  }

  AlertBoxError(message: string) {
    const alert = new AlertBoxMessage();
    alert.alertType = 1;
    alert.title = `ERRO`;
    alert.message = message;
    this.AlertBox(alert);
    window.scrollTo(0,0);
  }

  AlertBoxInformation(message: string) {
    const alert = new AlertBoxMessage();
    alert.alertType = 2;
    alert.title = `Informação`;
    alert.message = message;
    this.AlertBox(alert);
  }

  AlertBoxWarnign(message: string) {
    const alert = new AlertBoxMessage();
    alert.alertType = 3;
    alert.title = `ATENÇÃO`;
    alert.message = message;
    this.AlertBox(alert);
  }

  AlertBoxCheck(message: string) {
    const alert = new AlertBoxMessage();
    alert.alertType = 4;
    alert.title = `SUCESSO`;
    alert.message = message;
    this.AlertBox(alert);
  }
}
