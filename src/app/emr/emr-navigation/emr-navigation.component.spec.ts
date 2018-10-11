import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmrNavigationComponent } from './emr-navigation.component';

describe('EmrNavigationComponent', () => {
  let component: EmrNavigationComponent;
  let fixture: ComponentFixture<EmrNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmrNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmrNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
