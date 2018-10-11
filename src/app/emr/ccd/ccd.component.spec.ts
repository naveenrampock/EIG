import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcdComponent } from './ccd.component';

describe('CcdComponent', () => {
  let component: CcdComponent;
  let fixture: ComponentFixture<CcdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
