import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-diagnostic-report',
  templateUrl: './diagnostic-report.component.html',
  styleUrls: ['./diagnostic-report.component.css']
})
export class DiagnosticReportComponent implements OnInit {
  @ViewChild (EmrNavigationComponent) emrnavigation :EmrNavigationComponent;
  tableHeaders = [];
  isShowDetails: boolean = false;
  selectedDiagnostic: any;
  pageNo: number = 1;
  totalcount: number;
  diagnosticList:Array<any>=[];
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  msgs: any[];
  public press: boolean = false;
  public alpha: string ="";
  constructor(private diagnoticService: EmrService,private diagnosticService: EmrService) { }

  ngOnInit() { 
    this.tableHeaders = ['Name', 'SourceType', 'SourceID', 'Creater', 'DeviceIdentifier', 'Jurisdiction', 'CarrierHRF', 'Action']
  }

  showDiagnosticDetails() {
    this.selectedDiagnostic = null;
    this.isShowDetails = true;
  }

  showListingPage() {
    console.log('came from details');
    this.isShowDetails = false;
   
  }

  getDiagnosticList() {
    const data = { Id: this.id, pageNo: this.pageNo, pageSize: 10 }
    this.diagnosticService.getDiagnosticList(data)
      .subscribe((res) => {
        this.diagnosticList = res.Body.Data.conditionList;
        console.log(this.diagnosticList)
        this.totalcount = res.Body.Data.TotalItemCount;
      })
      this.emrnavigation.getTotalList();
  }

  loadLazy(LazyLoadEvent) {
    let count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    this.getDiagnosticList();

  }

  editCondition(diagnosticnData,str) {
    this.selectedDiagnostic = {data:diagnosticnData,mode:str};
    this.isShowDetails = true;
  }


  deleteCondition(delItem) {
    this.diagnoticService.deleteDiagnostic(delItem.Id)
      .subscribe((res) => {
       if(res.Header.Code==200){
        this.showSuccess(res.Header.Message);
        this.diagnosticList.splice(this.diagnosticList.indexOf(delItem),1);
        this.getDiagnosticList();
       }
      })
  }


  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }
}
