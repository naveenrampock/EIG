import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.css']
})
export class ProcedureComponent implements OnInit {
  @ViewChild(EmrNavigationComponent) emrnavigation: EmrNavigationComponent;
  userId = Cookie.get('Id');
  isShowProcedure: boolean = false;
  selectedProcedure: any;
  emrProcedureLists: Array<any> = [];
  tableHeaders: string[];
  msgs: any[];
  pageNo: number;
  totalcount: any;
  press: boolean = false;
  alpha: string = "";

  constructor(private emrService: EmrService) { }

  ngOnInit() {
    this.getEmrProcedureList();
    this.tableHeaders = ['SourceType', 'SourceId', 'Creater', 'Status', 'Definition', 'BasedOn', 'PartOf', 'Category', 'Action'];
  }
  showProcedureDetails() {

    this.selectedProcedure = null;
    this.isShowProcedure = true;
  }

  showListingPage(event) {
    this.isShowProcedure = false;
  }

  editProcedure(data, mode) {
    this.selectedProcedure = { data, mode };
    this.isShowProcedure = true;
  }

  deleteProcedure(delItem) {
    let params = delItem.Id;
    this.emrService.deleteProcedureById(params)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.emrProcedureLists.splice(this.emrProcedureLists.indexOf(delItem), 1);
          this.getEmrProcedureList();
        }
      })
  }

  getEmrProcedureList() {
    let params = { 'Id': this.userId, pageNo: this.pageNo, pageSize: 10 }
    this.emrService.getEmrProcedureList(params)
      .subscribe(res => {
        this.emrProcedureLists = res.Body.Data.Items;
        this.totalcount = res.Body.Data.TotalItemCount;
      })
    this.emrnavigation.getTotalList();
  }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  loadLazy(LazyLoadEvent) {
    let count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    this.getEmrProcedureList();
  }

  searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }
}
