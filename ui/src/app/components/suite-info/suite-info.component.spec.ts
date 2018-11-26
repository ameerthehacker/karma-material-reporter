import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiteInfoComponent } from './suite-info.component';

describe('SuiteInfoComponent', () => {
  let component: SuiteInfoComponent;
  let fixture: ComponentFixture<SuiteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuiteInfoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
