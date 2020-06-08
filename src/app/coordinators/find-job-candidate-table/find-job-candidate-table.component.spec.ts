import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJobCandidateTableComponent } from './find-job-candidate-table.component';

describe('FindJobCandidateTableComponent', () => {
  let component: FindJobCandidateTableComponent;
  let fixture: ComponentFixture<FindJobCandidateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindJobCandidateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindJobCandidateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
