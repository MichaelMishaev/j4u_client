import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedReportTableComponent } from './completed-report-table.component';

describe('CompletedReportTableComponent', () => {
  let component: CompletedReportTableComponent;
  let fixture: ComponentFixture<CompletedReportTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedReportTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
