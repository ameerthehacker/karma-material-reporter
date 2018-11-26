import {
  MatTabsModule,
  MatExpansionModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatCardModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SuiteInfoComponent } from './components/suite-info/suite-info.component';

import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let env;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, SuiteInfoComponent],
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        FlexLayoutModule,
        MatExpansionModule,
        MatListModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        MatCardModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    env = {
      '0': {
        browser: {
          id: '0',
          name: 'Chrome'
        },
        info: {
          specs: {},
          total: 0
        },
        logs: {
          spec0: {
            fullName: 'some suite',
            log: ['some error']
          }
        }
      },
      '1': {
        browser: {
          id: '1',
          name: 'Firefox'
        },
        info: {
          specs: {},
          total: 0
        },
        logs: {}
      }
    };
  }));

  describe('browsers tab group', () => {
    it('should list the browsers as tabs', () => {
      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      fixture.componentInstance.browsers = fixture.componentInstance.getBrowsers(
        env
      );
      fixture.componentInstance.processBrowsers(
        fixture.componentInstance.browsers
      );
      const tabLabels = fixture.debugElement.queryAll(
        By.css('.mat-tab-label-content')
      );

      tabLabels.forEach((tabLabel, index) => {
        const browserImage = tabLabel.query(By.css('img'));

        expect(tabLabel.nativeElement.innerText).toBe(
          fixture.componentInstance.browsers[index].name
        );
        expect(browserImage.nativeElement.getAttribute('src')).toBe(
          fixture.componentInstance.browsers[index].image
        );
      });
    });
  });

  describe('summary info', () => {
    it('should not be visible when there is no summary', () => {
      env[0].summary = undefined;
      env[1].summary = undefined;

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const summaries = fixture.debugElement.queryAll(
        By.css('.summary-toolbar')
      );
      expect(summaries.length).toBe(0);
    });

    it('should be visible when there is summary', () => {
      env[0].summary = {
        total: 4,
        success: 2,
        failed: 1,
        skipped: 1,
        totalTime: 22
      };

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const summaries = fixture.debugElement.queryAll(
        By.css('.summary-toolbar')
      );
      expect(summaries.length).toBeGreaterThanOrEqual(1);
    });

    it('should show the correct information', () => {
      env[0].summary = {
        total: 4,
        success: 2,
        failed: 1,
        skipped: 1,
        totalTime: 22
      };

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const summary = fixture.debugElement.query(By.css('.summary-toolbar'));
      const summaryFormat = `Ran ${env[0].summary.total} specs, ${
        env[0].summary.skipped
      } skipped, ${env[0].summary.failed} failed`;
      const timeFormat = `finished in ${env[0].summary.totalTime / 1000}`;
      const specInfoElement = summary.query(By.css('.spec-info'));
      const timeInfoElement = summary.query(By.css('.time-info'));
      expect(specInfoElement.nativeElement.innerText).toContain(summaryFormat);
      expect(timeInfoElement.nativeElement.innerText).toContain(timeFormat);
    });

    it('should be red color when the tests fail', () => {
      env[0].summary = {
        total: 4,
        success: 2,
        failed: 1,
        skipped: 1,
        totalTime: 22
      };

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const summary = fixture.debugElement.query(By.css('.summary-toolbar'));
      const specInfoElement = summary.query(By.css('.spec-info'));
      const timeInfoElement = summary.query(By.css('.time-info'));

      expect(specInfoElement.nativeElement.getAttribute('class')).toContain(
        'red-color'
      );
      expect(timeInfoElement.nativeElement.getAttribute('class')).toContain(
        'red-color'
      );
    });

    it('should use singular form of specs when total === 1', () => {
      env[0].summary = {
        total: 1,
        success: 1,
        failed: 0,
        skipped: 0,
        totalTime: 22
      };

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const summary = fixture.debugElement.query(By.css('.summary-toolbar'));
      const specInfoElement = summary.query(By.css('.spec-info'));
      const summaryFormat = `Ran ${env[0].summary.total} spec, ${
        env[0].summary.skipped
      } skipped, ${env[0].summary.failed} failed`;

      expect(specInfoElement.nativeElement.innerText).toContain(summaryFormat);
    });

    it('should be green color when the tests fail', () => {
      env[0].summary = {
        total: 4,
        success: 2,
        failed: 0,
        skipped: 1,
        totalTime: 22
      };

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const summary = fixture.debugElement.query(By.css('.summary-toolbar'));
      const specInfoElement = summary.query(By.css('.spec-info'));
      const timeInfoElement = summary.query(By.css('.time-info'));
      expect(specInfoElement.nativeElement.getAttribute('class')).toContain(
        'green-color'
      );
      expect(timeInfoElement.nativeElement.getAttribute('class')).toContain(
        'green-color'
      );
    });
  });

  describe('browser error', () => {
    it('should not be visible when there is no browser error', () => {
      env[0].error = undefined;
      env[1].error = undefined;

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const summaries = fixture.debugElement.queryAll(By.css('.browser-error'));
      expect(summaries.length).toBe(0);
    });

    it('should be visible when there is a browser error', () => {
      env[0].error = {
        message: 'some-error'
      };

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const browserErrors = fixture.debugElement.queryAll(
        By.css('.browser-error')
      );
      expect(browserErrors.length).toBeGreaterThanOrEqual(1);
    });

    it('should diplay error message properly', () => {
      env[0].error = {
        message: 'some-error'
      };
      env[1].error = undefined;

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const browserError = fixture.debugElement.query(By.css('.browser-error'));
      expect(browserError.nativeElement.innerText).toContain(
        env[0].error.message
      );
    });

    it('should diplay error object itself when message property === undefined', () => {
      env[0].error = 'some error!';
      env[1].error = undefined;

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const browserError = fixture.debugElement.query(By.css('.browser-error'));
      expect(browserError.nativeElement.innerText).toContain(env[0].error);
    });
  });

  describe('no tests', () => {
    it('should not be visible when there is browser error', () => {
      env[0].error = 'some error!';
      env[0].info.total = 0;

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const noTests = fixture.debugElement.queryAll(By.css('.no-tests'));
      expect(noTests.length).toBe(0);
    });

    it('should be visible when there no tests', () => {
      env[0].info.total = 0;

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const noTests = fixture.debugElement.queryAll(By.css('.no-tests'));
      expect(noTests.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('logs', () => {
    it('should not be visible when there is browser error', () => {
      env[0].error = 'some error!';
      env[0].info.total = 1;
      fixture.componentInstance.logs[0] = [
        { fullName: 'some spec', log: ['some error'] }
      ];

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const logs = fixture.debugElement.queryAll(By.css('.logs'));
      expect(logs.length).toBe(0);
    });

    it('should not be visible when info === undefined', () => {
      env[0].info = undefined;

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const logs = fixture.debugElement.queryAll(By.css('.logs'));
      expect(logs.length).toBe(0);
    });

    it('should not be visible when there is no log', () => {
      env[0].info.total = 1;
      env[0].logs = {};

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const logs = fixture.debugElement.queryAll(By.css('.logs'));
      expect(logs.length).toBe(0);
    });

    it('should be visible when there is log', () => {
      env[0].info.total = 1;
      env[0].logs = {
        spec0: {
          fullName: 'some suite',
          log: ['some error']
        }
      };

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const logs = fixture.debugElement.queryAll(By.css('.logs'));
      expect(logs.length).toBeGreaterThanOrEqual(1);
    });

    it('should display the log correctly', () => {
      env[0].info.total = 1;
      env[0].logs = {
        spec0: {
          fullName: 'some suite',
          log: ['some error']
        }
      };

      fixture.componentInstance.updateUI(env);
      fixture.detectChanges();

      const logElement = fixture.debugElement.query(By.css('.logs'));
      const logContent = logElement.query(By.css('.mat-card-content'));
      const logs = logContent.queryAll(By.css('div'));
      const errorLogs = fixture.componentInstance.logs[0];

      logs.forEach((log, index) => {
        expect(log.nativeElement.innerText).toContain(
          errorLogs[index].fullName
        );
        expect(log.nativeElement.innerText).toContain(errorLogs[index].log);
      });
    });
  });
});
