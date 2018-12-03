import { AppComponent } from './app.component';

import { SocketService } from './services/socket.service';
import { SocketClientServiceMock } from '../../__mocks__/socket.client.service';

import { browserImages } from './constants';

import { Subject } from 'rxjs';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let socketService: SocketService;
  let env;
  let initSubject: Subject<any>;
  let specResultSubject: Subject<any>;
  let browserErrorSubject: Subject<any>;
  let summarySubject: Subject<any>;
  let settingsSubject: Subject<any>;

  beforeEach(() => {
    socketService = new SocketService(new SocketClientServiceMock());
    initSubject = new Subject();
    specResultSubject = new Subject();
    browserErrorSubject = new Subject();
    summarySubject = new Subject();
    settingsSubject = new Subject();

    spyOn(socketService, 'init').and.returnValue({});
    spyOn(socketService, 'onMessage').and.callFake((key) => {
      switch (key) {
        case 'init':
          return initSubject;
        case 'specResult':
          return specResultSubject;
        case 'browserError':
          return browserErrorSubject;
        case 'summary':
          return summarySubject;
        case 'settings':
          return settingsSubject;
      }
    });
    appComponent = new AppComponent(socketService);

    env = {
      '0': {
        browser: {
          id: '0',
          name: 'Chrome'
        },
        logs: {
          spec0: {
            fullName: 'suite1 spec1',
            log: ['some error']
          }
        }
      },
      '1': {
        browser: {
          id: '1',
          name: 'Firefox'
        },
        logs: {}
      }
    };
  });

  describe('getBrowsers()', () => {
    it('should get the browsers array correctly', () => {
      const browsers = appComponent.getBrowsers(env);

      expect(browsers).toEqual([
        {
          id: '0',
          name: 'Chrome'
        },
        {
          id: '1',
          name: 'Firefox'
        }
      ]);
    });
  });

  describe('processBrowsers()', () => {
    let browsers;

    beforeEach(() => {
      browsers = [
        {
          id: 0,
          name: 'Chrome'
        },
        {
          id: 1,
          name: 'Firefox'
        }
      ];
    });

    it('should process the browser info properly', () => {
      appComponent.env = env;
      const chromeImage = browserImages.find((image) =>
        image.name.startsWith('Chrome')
      ).image;
      const firefoxImage = browserImages.find((image) =>
        image.name.startsWith('Firefox')
      ).image;

      appComponent.processBrowsers(browsers);

      expect(browsers).toEqual([
        {
          id: 0,
          name: 'Chrome',
          image: chromeImage
        },
        {
          id: 1,
          name: 'Firefox',
          image: firefoxImage
        }
      ]);
    });
  });

  describe('onMessage()', () => {
    it('message `init` should call updateUI() with env', () => {
      spyOn(appComponent, 'updateUI').and.callFake(() => {});
      appComponent.ngOnInit();

      initSubject.next(env);

      expect(appComponent.updateUI).toHaveBeenCalledWith(env);
    });

    it('message `specResult` should call updateUI() with env', () => {
      spyOn(appComponent, 'updateUI').and.callFake(() => {});
      appComponent.ngOnInit();

      specResultSubject.next(env);

      expect(appComponent.updateUI).toHaveBeenCalledWith(env);
    });

    it('message `browserError` should update env with error', () => {
      appComponent.env = env;
      appComponent.ngOnInit();
      const browserError = {
        id: 0,
        error: 'some error!'
      };

      browserErrorSubject.next(browserError);

      expect(appComponent.env[0].error).toEqual(browserError.error);
    });

    it('message `summary` should update env with summary', () => {
      appComponent.env = env;
      appComponent.ngOnInit();
      const summary = {
        id: 1,
        summary: 'some summary!'
      };

      summarySubject.next(summary);

      expect(appComponent.env[1].summary).toEqual(summary.summary);
    });

    it('message `settings` should update settings', () => {
      appComponent.env = env;
      appComponent.ngOnInit();
      const settings = {
        expandSuites: false
      };

      settingsSubject.next(settings);

      expect(appComponent.settings).toEqual(settings);
    });

    it('should unsubscribe all the observables onDestroy()', () => {
      appComponent.ngOnInit();
      spyOn(appComponent.initSubscription, 'unsubscribe');
      spyOn(appComponent.specResultSubscription, 'unsubscribe');
      spyOn(appComponent.summarySubscription, 'unsubscribe');
      spyOn(appComponent.browserErrorSubscription, 'unsubscribe');
      spyOn(appComponent.settingsSubscription, 'unsubscribe');

      appComponent.ngOnDestroy();

      expect(appComponent.initSubscription.unsubscribe).toHaveBeenCalled();
      expect(
        appComponent.specResultSubscription.unsubscribe
      ).toHaveBeenCalled();
      expect(appComponent.summarySubscription.unsubscribe).toHaveBeenCalled();
      expect(
        appComponent.browserErrorSubscription.unsubscribe
      ).toHaveBeenCalled();
      expect(appComponent.settingsSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('updateUI()', () => {
    it('should call getBrowsers()', () => {
      spyOn(appComponent, 'processBrowsers').and.callFake(() => {});
      spyOn(appComponent, 'getBrowsers');
      appComponent.env = env;

      appComponent.updateUI(env);

      expect(appComponent.getBrowsers).toHaveBeenCalledWith(env);
    });

    it('should call processBrowsers()', () => {
      spyOn(appComponent, 'processBrowsers');
      appComponent.env = env;

      appComponent.updateUI(env);

      const browsers = appComponent.getBrowsers(env);

      expect(appComponent.processBrowsers).toHaveBeenCalledWith(browsers);
    });

    it('should add only new browsers', () => {
      appComponent.env = env;
      appComponent.browsers = appComponent.getBrowsers(env);
      appComponent.browsers = appComponent.processBrowsers(
        appComponent.browsers
      );
      const currentBrowsers = appComponent.browsers;

      spyOn(appComponent, 'processBrowsers').and.callFake(() => {
        return [
          {
            id: 0,
            name: 'Chrome'
          }
        ];
      });

      appComponent.updateUI(env);

      expect(appComponent.browsers).toEqual(currentBrowsers);
    });
  });
});
