import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditCaseComponent } from './admin-edit-case.component';

describe('AdminEditCaseComponent', () => {
  let component: AdminEditCaseComponent;
  let fixture: ComponentFixture<AdminEditCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
