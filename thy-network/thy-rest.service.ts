import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestGetRequest, RestPostRequest, RestPutRequest, RestDeleteRequest } from './models/rest-requests.class';
import { NetworkService } from './thy-network.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private networkService: NetworkService, private http: HttpClient) {
  }

  public async get<T>(model: RestGetRequest, noTime = false): Promise<T> {
    const date = noTime === false ? new Date(Date.now()).getTime() : null;
    return await this.http.get<T>(`${this.networkService.uri}${model.request}`).toPromise();
  }

  public async post<T>(model: RestPostRequest<any>): Promise<any> {
    return await this.http.post<T>(this.networkService.uri + model.request, model.body).toPromise().catch((reason: HttpErrorResponse) => this.onError(reason));
  }

  public async put<T>(model: RestPutRequest<T>): Promise<T> {
    return await this.http.put<T>(this.networkService.uri + model.request, model.body).toPromise();
  }

  public async delete<T>(model: RestDeleteRequest): Promise<T> {
    return await this.http.delete<T>(this.networkService.uri + model.request).toPromise();
  }

  private async onError(reason: HttpErrorResponse) {
    switch (reason.status) {
      case 401:
        console.log('Unauthorized');
        if (this.networkService.token) {
          const response = await this.post(new RestPostRequest('login/refresh', { token: this.networkService.token }));
          console.log(response);
        }
        break;
      default:
        break;
    }
  }

}
