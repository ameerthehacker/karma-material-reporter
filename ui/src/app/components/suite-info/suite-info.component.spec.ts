import {
  MatExpansionModule,
  MatListModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCardModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiteInfoComponent } from './suite-info.component';

import { By } from '@angular/platform-browser';

describe('SuiteInfoComponent', () => {
  let fixture: ComponentFixture<SuiteInfoComponent>;
  let suiteInfo: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuiteInfoComponent],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatListModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule
      ]
    }).compileComponents();

    suiteInfo = {
      'example suite1': {
        $: {
          status: 'success',
          time: 2
        },
        _: [
          {
            description: 'test1',
            success: true,
            time: 2
          }
        ]
      },
      'example suite2': {
        $: {
          status: 'success',
          time: 4
        },
        _: [
          {
            description: 'test2',
            success: true,
            time: 3
          }
        ]
      },
      'example suite3': {
        $: {
          status: 'success',
          time: 4
        },
        _: [
          {
            description: 'test3',
            success: true,
            time: 5
          },
          {
            description: 'test4',
            success: true,
            skipped: true,
            time: 5
          }
        ]
      }
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteInfoComponent);
  });

  describe('suite title', () => {
    it('should have suite name in title', () => {
      const suiteTitles = Object.keys(suiteInfo);

      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const titleElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-header-title')
      );
      titleElements.forEach((titleElement, index) => {
        expect(titleElement.nativeElement.innerText).toContain(
          suiteTitles[index]
        );
      });
    });

    it('should have time taken to run spec in title', () => {
      const suiteTitles = Object.keys(suiteInfo);

      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const titleElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-header-title')
      );
      titleElements.forEach((titleElement, index) => {
        const timeFormat = `${fixture.componentInstance.suiteInfo[
          suiteTitles[index]
        ].$.time / 1000}s`;
        expect(titleElement.nativeElement.innerText).toContain(timeFormat);
      });
    });

    it('should show icon properly', () => {
      suiteInfo['example suite1'].$ = {
        status: 'success'
      };
      suiteInfo['example suite2'].$ = {
        status: 'fail'
      };

      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const titleElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-header-title')
      );

      titleElements.forEach((titleElement, index) => {
        const iconElement = titleElement.query(By.css('.mat-icon'));
        const suite = suiteInfo[fixture.componentInstance.suites[index]];

        if (suite.$.status === 'success') {
          expect(iconElement.nativeElement.innerText).toBe('done');
        } else if (suite.$.status === 'fail') {
          expect(iconElement.nativeElement.innerText).toBe('clear');
        }
      });
    });

    it('should not show icon only when $ ==== undefined', () => {
      suiteInfo['example suite1'].$ = undefined;
      suiteInfo['example suite2'].$ = undefined;
      suiteInfo['example suite3'].$ = undefined;

      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const titleElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-header-title')
      );

      titleElements.forEach((titleElement, index) => {
        const iconElement = titleElement.query(By.css('.mat-icon'));

        expect(iconElement).toBeNull();
      });
    });

    it('should show spinner when $ ==== undefined', () => {
      suiteInfo['example suite1'].$ = undefined;
      suiteInfo['example suite2'].$ = undefined;
      suiteInfo['example suite3'].$ = undefined;

      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const titleElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-header-title')
      );

      titleElements.forEach((titleElement, index) => {
        const iconElement = titleElement.query(By.css('.mat-spinner'));

        expect(iconElement).toBeTruthy();
      });
    });

    it('should show spec count in the expansion panel description', () => {
      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const descriptionElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-header-description')
      );

      descriptionElements.forEach((descriptionElement, index) => {
        const specCount =
          suiteInfo[fixture.componentInstance.suites[index]]._.length;
        const specCountFormat = `${specCount} ${
          specCount === 1 ? 'spec' : 'specs'
        }`;

        expect(descriptionElement.nativeElement.innerText).toContain(
          specCountFormat
        );
      });
    });
  });

  describe('spec list', () => {
    it('should have the spec name in the title', () => {
      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const contentElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-content')
      );

      contentElements.forEach((contentElement, contentElementIndex) => {
        const specElements = contentElement.queryAll(
          By.css('.mat-list-item-content')
        );

        specElements.forEach((specElement, specElementIndex) => {
          const spec =
            suiteInfo[fixture.componentInstance.suites[contentElementIndex]]._[
              specElementIndex
            ];
          expect(specElement.nativeElement.innerHTML).toContain(
            spec.description
          );
        });
      });
    });

    it('should have time taken to run the spec in the title', () => {
      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const contentElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-content')
      );

      contentElements.forEach((contentElement, contentElementIndex) => {
        const specElements = contentElement.queryAll(
          By.css('.mat-list-item-content')
        );

        specElements.forEach((specElement, specElementIndex) => {
          const spec =
            suiteInfo[fixture.componentInstance.suites[contentElementIndex]]._[
              specElementIndex
            ];
          const specTimeElement = specElement.query(By.css('.spec-time'));
          const timeFormat = `${spec.time}s`;
          expect(specTimeElement.nativeElement.innerHTML).toContain(timeFormat);
        });
      });
    });

    it('should show/hide spinner when the spec is pending/not pending', () => {
      suiteInfo['example suite1']._[0] = 'test1';
      suiteInfo['example suite3']._[1] = 'test1';
      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const contentElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-content')
      );

      contentElements.forEach((contentElement, contentElementIndex) => {
        const specElements = contentElement.queryAll(
          By.css('.mat-list-item-content')
        );

        specElements.forEach((specElement, specElementIndex) => {
          const spinnerElement = specElement.query(By.css('.mat-spinner'));

          if (
            typeof suiteInfo[
              fixture.componentInstance.suites[contentElementIndex]
            ]._[specElementIndex] === 'object'
          ) {
            expect(spinnerElement).toBeNull();
          } else {
            expect(spinnerElement).toBeTruthy();
          }
        });
      });
    });

    it('icon should visible/invisible when spec is not pending/pending', () => {
      suiteInfo['example suite1']._[0] = 'test1';
      suiteInfo['example suite3']._[1] = 'test1';
      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const contentElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-content')
      );

      contentElements.forEach((contentElement, contentElementIndex) => {
        const specElements = contentElement.queryAll(
          By.css('.mat-list-item-content')
        );

        specElements.forEach((specElement, specElementIndex) => {
          const iconElement = specElement.query(By.css('.mat-icon'));

          if (
            typeof suiteInfo[
              fixture.componentInstance.suites[contentElementIndex]
            ]._[specElementIndex] === 'object'
          ) {
            expect(iconElement).toBeTruthy();
          } else {
            expect(iconElement).toBeNull();
          }
        });
      });
    });

    it('icon for success, fail and skipped should be shown properly', () => {
      fixture.componentInstance.suiteInfo = suiteInfo;
      fixture.detectChanges();

      const contentElements = fixture.debugElement.queryAll(
        By.css('.mat-expansion-panel-content')
      );

      contentElements.forEach((contentElement, contentElementIndex) => {
        const specElements = contentElement.queryAll(
          By.css('.mat-list-item-content')
        );

        specElements.forEach((specElement, specElementIndex) => {
          const iconElement = specElement.query(By.css('.mat-icon'));
          const spec =
            suiteInfo[fixture.componentInstance.suites[contentElementIndex]]._[
              specElementIndex
            ];

          if (spec.skipped) {
            expect(iconElement.nativeElement.innerHTML).toBe('blocked');
            expect(iconElement.nativeElement.getAttribute('class')).toContain(
              'red-color'
            );
          } else if (spec.success) {
            expect(iconElement.nativeElement.innerHTML).toBe('done');
            expect(iconElement.nativeElement.getAttribute('class')).toContain(
              'green-color'
            );
          } else if (!spec.success) {
            expect(iconElement.nativeElement.innerHTML).toBe('clear');
            expect(iconElement.nativeElement.getAttribute('class')).toContain(
              'red-color'
            );
          }
        });
      });
    });
  });
});
