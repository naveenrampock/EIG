import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersSharedDicomComponent } from './others-shared-dicom.component';

describe('OthersSharedDicomComponent', () => {
  let component: OthersSharedDicomComponent;
  let fixture: ComponentFixture<OthersSharedDicomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthersSharedDicomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersSharedDicomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
