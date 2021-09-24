import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { EventEmitter } from '@angular/core';

export class SocketSubject<T> {

    private _socket: WebSocketSubject<T>;
    public get socket(): WebSocketSubject<T> { return this._socket; }

    public get isClosed(): boolean { return this._socket ? this._socket.closed : true; }
    public get isStopped(): boolean { return this._socket ? this._socket.isStopped : true; }

    private _isConnected = false;
    public get isConnected(): boolean { return this._isConnected; }
    public set isConnected(value: boolean) {
        this._isConnected = value;
        this.stateChanged.emit(this._isConnected);
    }

    public stateChanged = new EventEmitter<boolean>();
    public received = new EventEmitter<T>();
    public rawReceived = new EventEmitter<string>();

    constructor(socket: WebSocketSubject<T>) {
        this._socket = socket;
    }

    public connect() {
        if (!this.socket || this._isConnected === true) { return; }
        this.socket.subscribe(message => this.onReceived(message), error => this.onError(error), () => this.onComplete());
        this.isConnected = true;
    }

    public send(message: T) {
        if (!this.socket || this.isConnected === false) { return; }
        this.socket.next(message);
    }

    public disconnect(): boolean {
        if (!this.socket || this._isConnected === false) { return false; }
        this.socket.complete();
    }

    public onReceived(message: T) {
        this.rawReceived.emit(JSON.stringify(message));
        this.received.emit(message);
    }

    public onError(error: CloseEvent) {
        switch (error.type) {
            case 'close':
                this.disconnect();
                break;
            default:
                console.log('error', error);
                break;
        }
    }

    public onComplete() {
        this.isConnected = false;
    }

}
