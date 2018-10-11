import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.component.html',
  styleUrls: ['./care-plan.component.css']
})
export class CarePlanComponent implements OnInit {
  userId = Cookie.get('Id');
  isShowCarePlan: boolean = false;
  selectedCarePlan: any;
  emrCarePlanLists: Array<any> = [];
  tableHeaders: string[];
  msgs: any[];
  pageNo: number;
  totalcount: any;
  press: boolean = false;
  alpha: string ="";
  @ViewChild(EmrNavigationComponent) emrnavigation : EmrNavigationComponent;
  constructor(private emrService: EmrService) { }

  ngOnInit() {
    // this.getEmrCarePlanList();
    this.tableHeaders = ['SourceType', 'SourceId', 'Creater', 'Status', 'Definition', 'BasedOn', 'Replaces', 'PartOf', 'Action'];
  }
  showCarePlanDetails() {
    this.selectedCarePlan = null;
    this.isShowCarePlan = true;
  }

  showListingPage() {
    this.isShowCarePlan = false;
  }

  editCarePlan(data, mode) {
    this.selectedCarePlan = { data, mode };
    this.isShowCarePlan = true;
  }

  deleteCarePlan(delItem) {
    let params = delItem.Id;
    this.emrService.deleteCarePlanById(params)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.emrCarePlanLists.splice(this.emrCarePlanLists.indexOf(delItem), 1);
          this.getEmrCarePlanList();
        }
      })
  }

  getEmrCarePlanList() {
    let params = { 'Id': this.userId, pageNo: this.pageNo, pageSize: 10 }
    this.emrService.getEmrCarePlanList(params)
      .subscribe(res => {
        this.emrCarePlanLists = res.Body.Data.Items;
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
    this.getEmrCarePlanList();
  }
  
  searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }
}
