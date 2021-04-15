import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ThyNetworkService } from './thy-network.service';

@Injectable({
  providedIn: 'root'
})
export class ThyTokenInterceptorService implements HttpInterceptor {

  constructor(public networkService: ThyNetworkService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: this.networkService.token ? `Bearer ${this.networkService.token}` : ''
      }
    });

    return next.handle(request);
  }

}
