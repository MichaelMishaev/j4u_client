import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectReportComponent } from './incorrect-report.component';

describe('IncorrectReportComponent', () => {
  let component: IncorrectReportComponent;
  let fixture: ComponentFixture<IncorrectReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncorrectReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
