import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedCasesComponent } from './invited-cases.component';

describe('InvitedCasesComponent', () => {
  let component: InvitedCasesComponent;
  let fixture: ComponentFixture<InvitedCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitedCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
