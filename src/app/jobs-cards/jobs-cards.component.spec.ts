import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCardsComponent } from './jobs-cards.component';

describe('JobsCardsComponent', () => {
  let component: JobsCardsComponent;
  let fixture: ComponentFixture<JobsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
