import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterDetailsComponent } from './encounter-details.component';

describe('EncounterDetailsComponent', () => {
  let component: EncounterDetailsComponent;
  let fixture: ComponentFixture<EncounterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncounterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
