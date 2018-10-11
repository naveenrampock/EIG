import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLingualMasterComponent } from './multi-lingual-master.component';

describe('MultiLingualMasterComponent', () => {
  let component: MultiLingualMasterComponent;
  let fixture: ComponentFixture<MultiLingualMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiLingualMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLingualMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
