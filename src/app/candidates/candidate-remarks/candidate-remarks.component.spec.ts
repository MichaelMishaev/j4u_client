import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateRemarksComponent } from './candidate-remarks.component';

describe('CandidateRemarksComponent', () => {
  let component: CandidateRemarksComponent;
  let fixture: ComponentFixture<CandidateRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
