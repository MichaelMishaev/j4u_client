import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnRoomComponent } from './learn-room.component';

describe('LearnRoomComponent', () => {
  let component: LearnRoomComponent;
  let fixture: ComponentFixture<LearnRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
