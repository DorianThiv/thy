import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThyNetworkService {

  private proto: string = isDevMode() ? 'http:' : window.location.protocol;
  private host: string = window.location.hostname;
  private port: string = window.location.port;
  private uriport: string = '44342';
  private api = '/api/';

  public token: string;

  public get isConnected(): boolean { return this.token ? true : false; }

  public get url() { return `${this.proto}//${this.host}:${this.port}/#/`; }

  public get uri() { return `${this.proto}//${this.host}:${this.uriport}${this.api}`; }

  public get wsUri() { return `ws://${this.host}:${this.uriport}${this.api}`; }

  constructor() {
  }

}
