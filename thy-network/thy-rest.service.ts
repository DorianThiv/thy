import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThyRestDeleteRequest, ThyRestGetRequest, ThyRestPostRequest, ThyRestPutRequest } from './models/thy-rest-requests.class';
import { ThyNetworkService } from './thy-network.service';

@Injectable({
  providedIn: 'root'
})
export class ThyRestService {

  constructor(private networkService: ThyNetworkService, private http: HttpClient) {
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
          const response = await this.post(new ThyRestPostRequest('login/refresh', { token: this.networkService.token }));
          console.log(response);
        }
        break;
      default:
        console.error(reason);
        break;
    }
  }

}
