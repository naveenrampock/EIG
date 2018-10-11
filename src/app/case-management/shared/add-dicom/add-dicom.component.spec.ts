import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDicomComponent } from './add-dicom.component';

describe('AddDicomComponent', () => {
  let component: AddDicomComponent;
  let fixture: ComponentFixture<AddDicomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDicomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDicomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
