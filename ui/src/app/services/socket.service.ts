import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { SocketClientService } from './socket.client.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor(private socketClientService: SocketClientService) {}

  public init() {
    this.socket = this.socketClientService.io(environment.serverUrl);
  }

  public send(key: string, value: any) {
    this.socket.emit(key, value);
  }

  public onMessage(key: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(key, (value: any) => observer.next(value));
    });
  }

  public getSocket() {
    return this.socket;
  }
}
