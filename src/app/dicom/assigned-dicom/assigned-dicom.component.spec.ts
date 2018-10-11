import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedDicomComponent } from './assigned-dicom.component';

describe('AssignedDicomComponent', () => {
  let component: AssignedDicomComponent;
  let fixture: ComponentFixture<AssignedDicomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedDicomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedDicomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
