import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTableLinkComponent } from './reports-table-link.component';

describe('ReportsTableLinkComponent', () => {
  let component: ReportsTableLinkComponent;
  let fixture: ComponentFixture<ReportsTableLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsTableLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTableLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
