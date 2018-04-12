import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable, Injector} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    if (!isNullOrUndefined(token)) {
      if (req.url.indexOf('viacep.com.br') >= 0) {
        return next.handle(req);
      }
      const authRequest = req.clone({setHeaders: {'Authorization': `bearer ${token}`}});
      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
