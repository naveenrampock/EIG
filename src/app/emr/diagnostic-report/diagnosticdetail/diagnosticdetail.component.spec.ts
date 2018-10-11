import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticdetailComponent } from './diagnosticdetail.component';

describe('DiagnosticdetailComponent', () => {
  let component: DiagnosticdetailComponent;
  let fixture: ComponentFixture<DiagnosticdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
