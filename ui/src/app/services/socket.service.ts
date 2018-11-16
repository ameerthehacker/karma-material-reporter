import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() {}

  public init() {
    this.socket = io(environment.serverUrl);
  }

  public send(key: string, value: any) {
    this.socket.emit(key, value);
  }

  public onMessage(key: string): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on(key, (value: any) => observer.next(value));
    });
  }
}
