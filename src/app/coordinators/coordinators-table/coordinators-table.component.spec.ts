import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorsTableComponent } from './coordinators-table.component';

describe('CoordinatorsTableComponent', () => {
  let component: CoordinatorsTableComponent;
  let fixture: ComponentFixture<CoordinatorsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoordinatorsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
