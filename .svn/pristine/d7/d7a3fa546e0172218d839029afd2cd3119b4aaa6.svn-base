import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {
  @ViewChild(EmrNavigationComponent) emrnavigation : EmrNavigationComponent;
  public isShowObservationDetails: boolean = false;
  public tableHeaders: string[];
  public listEmrObservation: Array<any> = [];
  public selectedObservation: any;
  public msgs: any[];
  public totalcount: any;
  private pageNo: number;
  public press: boolean = false;
  public alpha: string = "";
  private userId = Cookie.get('Id');


  constructor(private emrService: EmrService) { }

  ngOnInit() {
    this.tableHeaders = ['SourceType', 'SourceID', 'Creator', 'Status', 'Category', 'BasedOn', 'Code', 'Subject', 'Action']
  }

  public showObservationDetails() {
    this.selectedObservation = null;
    this.isShowObservationDetails = true;
  }

  public showObservationListingPage() {
    this.isShowObservationDetails = false;
  }

  public getEmrObservationList() {
    let params = { 'Id': this.userId, PageNo: this.pageNo, PageSize: 10 }
    this.emrService.getEmrObservation(params)
      .subscribe(observationLists => {
        this.listEmrObservation = observationLists.Body.Data.Items;
        this.totalcount = observationLists.Body.Data.TotalItemCount;
      })
      this.emrnavigation.getTotalList();
  }

  public editObservation(data, mode) {
    console.log(data);
    this.selectedObservation = { data, mode };
    this.isShowObservationDetails = true;
  }

  public deleteObservation(delItem) {
    this.emrService.deleteEmrObservation(delItem.Id, this.userId)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.listEmrObservation.splice(this.listEmrObservation.indexOf(delItem), 1);
          this.getEmrObservationList();
        }
      })
  }

  public loadLazy(LazyLoadEvent) {
    let count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    this.getEmrObservationList();
  }

  public searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
}
