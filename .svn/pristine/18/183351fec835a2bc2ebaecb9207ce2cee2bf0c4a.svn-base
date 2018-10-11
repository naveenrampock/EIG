import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-encouter',
  templateUrl: './encouter.component.html',
  styleUrls: ['./encouter.component.css']
})
export class EncouterComponent implements OnInit {
  @ViewChild (EmrNavigationComponent) emrnavigation : EmrNavigationComponent;
  userId = Cookie.get('Id');
  isShowEncounter: boolean = false;
  selectedEncounter: any;
  emrEncounterLists: Array<any> = [];
  tableHeaders: string[];
  msgs: any[];
  pageNo: number;
  totalcount: any;
  press: boolean = false;
  alpha: string ="";

  constructor(private emrService: EmrService) { }

  ngOnInit() {
    // this.getEmrEncounterList();
    this.tableHeaders = ['SourceType', 'SourceID', 'Creater', 'Status', 'Type', 'Priority', 'Appointment', 'Period', 'Action'];
  }
  showEncounterDetails() {
    this.selectedEncounter = null;
    this.isShowEncounter = true;
  }

  showListingPage() {
    this.isShowEncounter = false;
  }

  editEncounter(data, mode) {
    console.log(data);
    this.selectedEncounter = { data, mode };
    this.isShowEncounter = true;
  }

  deleteEncounter(delItem) {
    let params = delItem.Id;
    this.emrService.deleteEncounterById(params)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.emrEncounterLists.splice(this.emrEncounterLists.indexOf(delItem), 1);
          this.getEmrEncounterList();
        }
      })
  }

  getEmrEncounterList() {
    let params = { 'Id': this.userId, pageNo: this.pageNo, pageSize: 10 }
    this.emrService.getEmrEncounterListBy(params)
      .subscribe(res => {
        this.emrEncounterLists = res.Body.Data.Items;
        this.totalcount = res.Body.Data.TotalItemCount;
      })
      this.emrnavigation.getTotalList();
  }
  
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  loadLazy(LazyLoadEvent) {
    let count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    this.getEmrEncounterList();
  }

  searchCheck(evt) {
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }
}