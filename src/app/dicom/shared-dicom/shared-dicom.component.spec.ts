import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDicomComponent } from './shared-dicom.component';

describe('SharedDicomComponent', () => {
  let component: SharedDicomComponent;
  let fixture: ComponentFixture<SharedDicomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedDicomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedDicomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
