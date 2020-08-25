import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAutoCompleteComponent } from './candidate-auto-complete.component';

describe('CandidateAutoCompleteComponent', () => {
  let component: CandidateAutoCompleteComponent;
  let fixture: ComponentFixture<CandidateAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
