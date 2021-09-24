import { EventEmitter } from '@angular/core';
import { SocketReadyState } from './socket.enum';

export class SocketSimple<T> {

    private _socket: WebSocket;
    private _url: string;

    public get isConnected(): boolean { return this._socket && this._socket.readyState === SocketReadyState.Open; }

    public received = new EventEmitter<T>();
    public rawReceived = new EventEmitter<string>();
    public opened = new EventEmitter<boolean>();
    public closed = new EventEmitter<boolean>();

    constructor(url: string) {
        this._url = url;
    }

    public connect() {
        this._socket = new WebSocket(this._url);
        this._socket.onopen = (event: Event) => this.onOpen(event);
        this._socket.onerror = (event: Event) => this.onError(event);
        this._socket.onmessage = (message: MessageEvent) => this.onReceived(message);
    }

    public send(message: T) {
        if (!this._socket) { return; }
        this._socket.send(JSON.stringify(message));
    }

    public disconnect(): boolean {
        if (!this._socket) { return false; }
        this._socket.close();
        this.closed.emit(this.isConnected);
    }

    public onOpen(event: Event) {
        console.log(event);
        this.opened.emit(this.isConnected);
    }

    public onReceived(message: any) {
        this.rawReceived.emit(message);
        this.received.emit(this.stringToJsObject(message));
    }

    public onError(error: Event) {
        switch (error.type) {
            case 'close':
                break;
            default:
                console.log('error', error);
                break;
        }
        this.disconnect();
    }

    private  stringToJsObject(str: string): T {
        if (!str) { return null; }
        try {
          if (str.startsWith('{') || str.startsWith('[')) {
            return JSON.parse(str);
          }
        } catch (error) {
          console.log(error);
        }
    }

}
