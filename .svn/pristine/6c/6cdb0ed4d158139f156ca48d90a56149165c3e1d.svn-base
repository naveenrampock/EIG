import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-immunization',
  templateUrl: './immunization.component.html',
  styleUrls: ['./immunization.component.css']
})
export class ImmunizationComponent implements OnInit {
  @ViewChild (EmrNavigationComponent) emrnavigation : EmrNavigationComponent;
  public isShowImmunizationDetails: boolean = false;
  public tableHeaders: string[];
  public listEmrImmunization: Array<any> = [];
  public selectedImmunization: any;
  public msgs: any[];
  public totalcount: any;
  private userId = Cookie.get('Id');
  public press: boolean = false;
  public alpha: string ="";
  private pageNo: number;
  
  constructor(private emrService: EmrService) { }


  ngOnInit() {
    this.tableHeaders = [ 'SourceType', 'SourceID', 'Creator', 'Status', 'NotGiven', 'VaccineCode','Patient', 'Action']
  }

  public showimmunizationDetails() {
    this.selectedImmunization = null;
    this.isShowImmunizationDetails = true;
  }

  public showImmunizationListingPage(evt) {
    console.log('came from details');
    this.isShowImmunizationDetails = false;
  }

  public editImmunization(data, mode) {
    console.log(data,mode);
    this.selectedImmunization =  { data, mode };
    this.isShowImmunizationDetails = true;
  }
  
  public deleteImmunization(delItem) {
    this.emrService.deleteEmrImmunization(delItem.Id, this.userId)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.listEmrImmunization.splice(this.listEmrImmunization.indexOf(delItem), 1);
          this.getEmrImmunizationList();
        }
      })
  }
  
  public searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }

  public loadLazy(LazyLoadEvent) {
    let count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    this.getEmrImmunizationList();
  }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private getEmrImmunizationList() {
    let params = { 'Id': this.userId, PageNo:this.pageNo, PageSize: 10 }
    this.emrService.getEmrImmunization(params)
      .subscribe(immunizationLists => {
        this.listEmrImmunization = immunizationLists.Body.Data.Items;
        this.totalcount = immunizationLists.Body.Data.TotalItemCount;
      })
      this.emrnavigation.getTotalList();
  }

  
}
