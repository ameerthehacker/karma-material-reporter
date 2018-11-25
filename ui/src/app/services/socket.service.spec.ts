import { TestBed, inject } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { SocketClientService } from './socket.client.service';

import { environment } from '../../environments/environment';

class SocketClientServiceMock {
  public listenMap = {};

  public io(url: string) {
    const on = (key, fn) => {
      this.listenMap[key] = fn;
    };
    on.bind(this);

    return {
      send() {},
      emit() {},
      on
    };
  }
}

describe('SocketService', () => {
  let service: SocketService;
  let socketClientService: SocketClientServiceMock;

  beforeEach(() => {
    socketClientService = new SocketClientServiceMock();
    service = new SocketService(socketClientService);
  });

  describe('init()', () => {
    it('should call io() with server url', () => {
      spyOn(socketClientService, 'io');

      service.init();

      expect(socketClientService.io).toHaveBeenCalledWith(
        environment.serverUrl
      );
    });
  });

  describe('send()', () => {
    let key, value;

    beforeEach(() => {
      key = 'somekey';
      value = 'somevalue';
    });

    it('should call socket.send with key and value', () => {
      service.init();
      const spy = spyOn(service.getSocket(), 'emit');

      service.send(key, value);

      expect(spy).toHaveBeenCalledWith(key, value);
    });
  });

  describe('onMessage()', () => {
    let key, value;

    beforeEach(() => {
      key = 'somekey';
      value = 'somevalue';
    });

    it('should return a observable which emits on callback socket.on', (done) => {
      service.init();

      const subscription = service.onMessage(key).subscribe((emittedValue) => {
        expect(emittedValue).toBe(value);
        subscription.unsubscribe();
        done();
      });

      socketClientService.listenMap[key](value);
    });
  });
});
