import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddccrDetailsComponent } from './addccr-details.component';

describe('AddccrDetailsComponent', () => {
  let component: AddccrDetailsComponent;
  let fixture: ComponentFixture<AddccrDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddccrDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddccrDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
