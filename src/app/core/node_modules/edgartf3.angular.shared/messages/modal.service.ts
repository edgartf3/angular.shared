import {EventEmitter} from '@angular/core';
import {ModalMessage} from './ModalMessage';

export class ModalService {
  public notifier = new EventEmitter<ModalMessage>();

  constructor () {
    console.log('Constructor do serviço');
  }

  notify(message: ModalMessage) {
    this.notifier.emit(message);
  }

  MessageBox(message: string, title: string, cancelFunction: any, cancelCaption: string, cancelVisible: boolean, confirmFunction: any, confirmCaption: string, confirmVisible: boolean, icon?) {
    const msg = new ModalMessage();
    msg.cancelClick = cancelFunction;
    msg.confirmClick = confirmFunction;
    msg.body = message;
    msg.title = title;
    msg.icon = icon;
    msg.cancelCaption = cancelCaption;
    msg.confirmCaption = confirmCaption;
    msg.cancelVisible = cancelVisible;
    msg.confirmVisible = confirmVisible;
    this.notify(msg);

  }

  MessageBoxErro(message: string) {
    const msg = new ModalMessage();
    msg.body = message;
    msg.title = 'ERRO';
    msg.icon = 3;
    msg.cancelVisible = false;
    msg.confirmVisible = true;
    msg.confirmCaption = 'OK';
    this.notify(msg);
  }

  MessageBoxInfo(message: string) {
    const msg = new ModalMessage();
    msg.body = message;
    msg.title = 'Inormação';
    msg.icon = 1;
    msg.cancelVisible = false;
    msg.confirmVisible = true;
    msg.confirmCaption = 'OK';
    this.notify(msg);
  }

  MessageBoxSimNao(message: string, simFunciton: any, naoFunction: any) {
    const msg = new ModalMessage();
    msg.body = message;
    msg.title = 'ATENÇÃO';
    msg.icon = 2;
    msg.cancelVisible = true;
    msg.cancelClick = naoFunction;
    msg.confirmVisible = true;
    msg.cancelCaption = 'Não';
    msg.cancelClick = naoFunction;
    msg.confirmCaption = 'Sim';
    msg.confirmClick = simFunciton;
    this.notify(msg);
  }
}
