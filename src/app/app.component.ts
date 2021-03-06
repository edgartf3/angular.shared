import { Component } from '@angular/core';
import {NotificationService} from './shared/messages/notification.service';
import {ModalService} from './shared/messages/modal.service';
import { HttpClient } from '@angular/common/http';
import {BuscaCepService} from './shared/BuscaCep/BuscaCep.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  msg = 'Digite sua mensagem aqui!';
  constructor(private notificationService: NotificationService,
              private http: HttpClient,
              private modalService: ModalService,
              private buscaCep: BuscaCepService) { }

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
  ChamarBackEndErrado() {
    console.log('chamando backend falso');
    this.http.get<any>('http://localhost:5000/api/teste').subscribe((resp) => {
      console.log(resp);
    });
  }
  BuscaCep(cep: string) {
    this.buscaCep.Consultar(cep).subscribe((resp) => {console.log(resp); }, (erro) => {console.log(erro); });
  }

}
