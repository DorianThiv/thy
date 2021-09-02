import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { COOKIE_CONSTENT_TOKEN, ThyCookiesService } from '../thy-cookies/thy-cookies.service';
import { ThyRestDeleteRequest, ThyRestGetRequest, ThyRestPostRequest, ThyRestPutRequest } from './models/thy-rest-requests.class';
import { ThyNetworkService } from './thy-network.service';

@Injectable({
  providedIn: 'root'
})
export class ThyRestService {

  constructor(private networkService: ThyNetworkService, private http: HttpClient, private cookiesService: ThyCookiesService) {
  }

  public async get<T>(model: ThyRestGetRequest, ketch = true): Promise<any> {

    return ketch ?
      await this.http.get<T>(`${this.networkService.uri}${model.request}`).toPromise().catch((reason: HttpErrorResponse) => this.onError(reason)) :
      await this.http.get<T>(`${this.networkService.uri}${model.request}`).toPromise();
  }

  public async post<T>(model: ThyRestPostRequest<any>, ketch = true): Promise<any> {
    return ketch ?
      await this.http.post<T>(this.networkService.uri + model.request, model.body).toPromise().catch((reason: HttpErrorResponse) => this.onError(reason)) :
      await this.http.post<T>(this.networkService.uri + model.request, model.body).toPromise();
  }

  public async put<T>(model: ThyRestPutRequest<T>, ketch = true): Promise<any> {
    return ketch ?
      await this.http.put<T>(this.networkService.uri + model.request, model.body).toPromise().catch((reason: HttpErrorResponse) => this.onError(reason)) :
      await this.http.put<T>(this.networkService.uri + model.request, model.body).toPromise();
  }

  public async delete<T>(model: ThyRestDeleteRequest, ketch = true): Promise<any> {
    return ketch ?
      await this.http.delete<T>(this.networkService.uri + model.request).toPromise().catch((reason: HttpErrorResponse) => this.onError(reason)) :
      await this.http.delete<T>(this.networkService.uri + model.request).toPromise();
  }

  private async onError(reason: HttpErrorResponse) {
    switch (reason.status) {
      case 401:
        if (this.networkService.token) {
          const result: { token: string } = await this.post<any>(new ThyRestPostRequest('login/token', { token: this.networkService.token }));
          if (result?.token) {
            this.networkService.token = result.token;
            this.cookiesService.set(COOKIE_CONSTENT_TOKEN, this.networkService.token);
          }
        }
        break;
      default:
        console.error(reason);
        break;
    }
  }

}
