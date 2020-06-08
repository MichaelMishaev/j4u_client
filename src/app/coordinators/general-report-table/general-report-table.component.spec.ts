import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportTableComponent } from './general-report-table.component';

describe('GeneralReportTableComponent', () => {
  let component: GeneralReportTableComponent;
  let fixture: ComponentFixture<GeneralReportTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralReportTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
