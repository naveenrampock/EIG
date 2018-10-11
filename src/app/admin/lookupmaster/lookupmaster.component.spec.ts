import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupmasterComponent } from './lookupmaster.component';

describe('LookupmasterComponent', () => {
  let component: LookupmasterComponent;
  let fixture: ComponentFixture<LookupmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
