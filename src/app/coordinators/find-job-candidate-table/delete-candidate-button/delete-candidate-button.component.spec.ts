import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCandidateButtonComponent } from './delete-candidate-button.component';

describe('DeleteCandidateButtonComponent', () => {
  let component: DeleteCandidateButtonComponent;
  let fixture: ComponentFixture<DeleteCandidateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCandidateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCandidateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
