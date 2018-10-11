import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedAppointmentsComponent } from './invited-appointments.component';

describe('InvitedAppointmentsComponent', () => {
  let component: InvitedAppointmentsComponent;
  let fixture: ComponentFixture<InvitedAppointmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
