import { Injectable } from '@angular/core';
import { SocketSubject } from './models/socket-subject.class';
import { WebSocketSubjectConfig, webSocket } from 'rxjs/webSocket';
import { ThyNetworkService } from '../thy-network/thy-network.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private networkService: ThyNetworkService) {
  }

  public createSubject<T>(url: string): SocketSubject<T> {
    if (!url) { return null; }
    const config: WebSocketSubjectConfig<any> = {
      url: `${this.networkService.wsUri}${url}`
    };
    return new SocketSubject(webSocket(config));
  }

  public createSimple(url: string) {
  }

}
