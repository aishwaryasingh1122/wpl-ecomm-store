import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SecureStorageService } from './secure-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  constructor(private secureStorageService: SecureStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const serverURL = environment.host;

    let headersToSet = {};

    if (req.url.indexOf('/account') !== -1) {
      headersToSet = {
        Authorization: `Bearer ${this.secureStorageService.getValue('token')}`,
      };
    }
    req = req.clone({
      url: serverURL + req.url,
      setHeaders: headersToSet,
    });

    return next.handle(req);
  }
}
