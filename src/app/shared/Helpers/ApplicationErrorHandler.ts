import {NotificationService} from '../messages/notification.service';
import {AlertBoxMessage} from '../messages/AlertBoxMessage';
import {RespostaPadrao} from '../Models/RespostaPadrao';
import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {isNullOrUndefined} from 'util';

@Injectable()
export class ApplicationErrorHandler extends  ErrorHandler {

    constructor (private notificationService: NotificationService, private zone: NgZone) {
        super();
    }

    GetPropertyValue(object: any, propertyName: string) {
        for (const key in object) {
            if (key === propertyName) {
                return object[key];
            }
        }
    }

    handleError(errorResponse: HttpErrorResponse | any) {
        console.log('HandleError');
        console.log('ErrorResponse -> ' + JSON.stringify(errorResponse));
        if (errorResponse instanceof HttpErrorResponse) {
            console.log('HandleError passo 01');
            const error = errorResponse.error;
            let msg = null;
            if (!isNullOrUndefined(error)) {
                if (!isNullOrUndefined(error.mensagem)) {
                    msg = error.mensagem;
                }
            }
            if (isNullOrUndefined(msg)) {
                switch (errorResponse.status) {
                    case 401:
                        msg = (errorResponse.message || 'Você não está autenticado');
                        break;
                    case 403:
                        msg = 'Não autorizado';
                        break;
                    case  404:
                        msg = 'Página não localizada';
                        break;
                    default:
                        msg = errorResponse.message;
                        break;
                }
            }
            console.log('HandleError passo 04 ' + msg);
            this.zone.run(() => {
                this.notificationService.AlertBoxError(msg);
            });

        }
        console.log('HandleError Fim');
        super.handleError(errorResponse);
    }


}
