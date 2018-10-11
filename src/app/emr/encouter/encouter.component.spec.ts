import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncouterComponent } from './encouter.component';

describe('EncouterComponent', () => {
  let component: EncouterComponent;
  let fixture: ComponentFixture<EncouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
