import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css']
})
export class ConditionComponent implements OnInit {
  tableHeaders = [];
  isShowConDetails: boolean = false;
  selectedCondition: any;
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  conditionList: Array<any> = [];
  pageNo: number = 1;
  totalcount: number;
  msgs: any[];
  press: boolean = false;
  alpha: string ="";
  @ViewChild (EmrNavigationComponent) emrnavigation: EmrNavigationComponent;

  constructor(private conditionService: EmrService) { }

  ngOnInit() {
    // Table headers goes here..
    this.tableHeaders = ['Name', 'SourceType', 'SourceID',  'ClinicalStatus', 'VerificationStatus', 'Action']

  }

  showConditionDetails() {
    this.selectedCondition = null;
    this.isShowConDetails = true;
  }

  showListingPage() {
    console.log('came from details');
    this.isShowConDetails = false;
    this.getConditionList()
  }



  getConditionList() {
    const data = { Id: this.id, pageNo: this.pageNo, pageSize: 10 }
    this.conditionService.getCondition(data)
      .subscribe((res) => {
        this.conditionList = res.Body.Data.conditionList;
        console.log(res.Body.Data.TotalItemCount)
        this.totalcount = res.Body.Data.TotalItemCount;
      })
    this.emrnavigation.getTotalList();
  }

  loadLazy(LazyLoadEvent) {
    let count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    this.getConditionList();

  }

  editCondition(condtionData,str) {
    this.selectedCondition = {data:condtionData,mode:str};
    this.isShowConDetails = true;
  }

  deleteCondition(delItem) {
    this.conditionService.deleteCondition(delItem.Id,this.id)
      .subscribe((res) => {
       if(res.Header.Code==200){
        this.showSuccess(res.Header.Message);
        this.conditionList.splice(this.conditionList.indexOf(delItem),1);
        this.getConditionList();
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
