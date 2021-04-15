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

  public async get<T>(model: ThyRestGetRequest, noTime = false): Promise<T> {
    const date = noTime === false ? new Date(Date.now()).getTime() : null;
    return await this.http.get<T>(`${this.networkService.uri}${model.request}`).toPromise();
  }

  public async post<T>(model: ThyRestPostRequest<any>): Promise<any> {
    return await this.http.post<T>(this.networkService.uri + model.request, model.body).toPromise().catch((reason: HttpErrorResponse) => this.onError(reason));
  }

  public async put<T>(model: ThyRestPutRequest<T>): Promise<T> {
    return await this.http.put<T>(this.networkService.uri + model.request, model.body).toPromise();
  }

  public async delete<T>(model: ThyRestDeleteRequest): Promise<T> {
    return await this.http.delete<T>(this.networkService.uri + model.request).toPromise();
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
        break;
    }
  }

}
