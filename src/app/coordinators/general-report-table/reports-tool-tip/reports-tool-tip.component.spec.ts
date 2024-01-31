import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsToolTipComponent } from './reports-tool-tip.component';

describe('ReportsToolTipComponent', () => {
  let component: ReportsToolTipComponent;
  let fixture: ComponentFixture<ReportsToolTipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsToolTipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsToolTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
