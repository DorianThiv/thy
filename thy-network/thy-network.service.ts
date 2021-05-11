import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThyNetworkService {

  private proto: string = isDevMode() ? 'http:' : window.location.protocol;
  private host: string = window.location.hostname;
  private port: string = isDevMode() ? '44342' : window.location.port;
  private api = '/api/';

  public token: string;

  public get isConnected(): boolean { return this.token ? true : false; }

  public get url() { return `${this.proto}//${this.host}:${this.port}/#/`; }

  public get uri() { return `${this.proto}//${this.host}:${this.port}${this.api}`; }

  public get wsUri() { return `wss://${this.host}:${this.port}${this.api}`; }

  constructor() {
  }

}
