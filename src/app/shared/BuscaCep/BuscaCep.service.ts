import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from '../messages/notification.service';

@Injectable()
export class BuscaCepService {
  constructor(private http: HttpClient, private notificationService: NotificationService) { }
  Consultar(cep: string): Observable<any> {
    if (cep.length === 8) {
      return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
        // .do(resp => { },
        //  erro => { this.notificationService.notify('CEP inválido'); } );
    } else {
      this.notificationService.notify('CEP inválido');
    }
  }
}
