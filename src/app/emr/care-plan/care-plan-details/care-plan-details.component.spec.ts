import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarePlanDetailsComponent } from './care-plan-details.component';

describe('CarePlanDetailsComponent', () => {
  let component: CarePlanDetailsComponent;
  let fixture: ComponentFixture<CarePlanDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarePlanDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarePlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
