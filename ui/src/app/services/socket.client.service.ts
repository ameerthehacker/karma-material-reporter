import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService {
  public io(url: string) {
    return io(url);
  }
}
