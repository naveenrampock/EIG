import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseManagementSidebarComponent } from './case-management-sidebar.component';

describe('CaseManagementSidebarComponent', () => {
  let component: CaseManagementSidebarComponent;
  let fixture: ComponentFixture<CaseManagementSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseManagementSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseManagementSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
