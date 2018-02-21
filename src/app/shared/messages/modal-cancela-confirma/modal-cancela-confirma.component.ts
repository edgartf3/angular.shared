import {Component, OnInit} from '@angular/core';
import {ModalService} from '../modal.service';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import {isNullOrUndefined} from 'util';


@Component({
  selector: 'app-modal-cancela-confirma',
  templateUrl: './modal-cancela-confirma.component.html',
  styleUrls: ['./modal-cancela-confirma.component.css']
})

export class ModalCancelaConfirmaComponent implements OnInit {

  body: string;
  title: string;
  confirmClick: any;
  cancelClick: any;
  icon: number;
  cancelVisible: boolean;
  confirmVisible: boolean;
  cancelCaption: string;
  confirmCaption: string;

  constructor(private modalService: ModalService) {  }

  ngOnInit() {
    this.modalService.notifier.subscribe(message => {
      this.body = message.body;
      this.title = message.title;
      this.confirmClick = message.confirmClick;
      this.cancelClick = message.cancelClick;
      this.icon = message.icon;
      this.confirmVisible = message.confirmVisible;
      this.cancelVisible = message.cancelVisible;
      this.confirmCaption = message.confirmCaption;
      this.cancelCaption = message.cancelCaption;
      this.ShowModal();
    });
  }

  ShowModal() {
    const btn = document.getElementById('btnShowModal');
    btn.click();
  }

  CloseModal() {
    const btn = document.getElementById('btnCloseModal');
    btn.click();
  }

  Cancelar() {

    if (!isNullOrUndefined(this.cancelClick)) {
      this.cancelClick();
    }
    this.LimparModal();

  }
  Confirmar() {
    if (!isNullOrUndefined(this.confirmClick)) {
      this.confirmClick();
    }
    this.LimparModal();
  }

  LimparModal() {
    this.confirmClick = null;
    this.cancelClick = null;
    this.CloseModal();
    this.body = '';
    this.title = '';
  }


}
