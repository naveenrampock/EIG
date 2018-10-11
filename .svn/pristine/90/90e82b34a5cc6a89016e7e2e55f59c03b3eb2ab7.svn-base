import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-management-sidebar',
  templateUrl: './case-management-sidebar.component.html',
  styleUrls: ['./case-management-sidebar.component.css']
})

export class CaseManagementSidebarComponent implements OnInit {
  customRange: { fromDate: string, endDate: string } = { fromDate: '', endDate: '' };
  @Input() caseType;
  fromDate: Date;
  endDate: Date;
  @Output()
  changeRange = new EventEmitter<any>();
  withApp: boolean = false;
  withoutApp: boolean = false;

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  getInvitedCaseDetails() {
  }

  selectFromDate() {
    let fromDate = new DatePipe('en').transform(this.fromDate, 'yyyy-MM-dd');
    this.customRange.fromDate = fromDate ? fromDate : '';
    this.onChangeDate(this.customRange);
    // this._router.navigate(['./case-management'], { queryParams: { fromDate: this.customRange.fromDate, endDate: this.customRange.endDate } })
  }

  selectEndDate() {
    let endDate = new DatePipe('en').transform(this.endDate, 'yyyy-MM-dd');
    this.customRange.endDate = endDate ? endDate : '';
    this.onChangeDate(this.customRange);
    // this._router.navigate(['./case-management'], { queryParams: { fromDate: this.customRange.fromDate, endDate: this.customRange.endDate }, skipLocationChange: true })
  }

  onChangeDate(range) {
    this.changeRange.emit({ fromDate: range.fromDate, endDate: range.endDate })
  }
  onClearClick() {
  }
  reset() {
    this.fromDate = null;
    this.endDate = null;
    this._router.navigate(['./case-management']);
  }

}
