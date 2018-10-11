import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  userId = Cookie.get('Id');
  isShowAppDetails: boolean = false;
  selectedAppointment: any;
  emrAppointmentLists: Array<any> = [];
  tableHeaders: string[];
  msgs: any[];
  pageNo: number;
  totalcount: any;
  press: boolean = false;
  alpha: string ="";
  @ViewChild (EmrNavigationComponent) emrnavigation : EmrNavigationComponent;
  constructor(private emrService: EmrService) { }

  ngOnInit() {
    // this.getEmrAppointmentList();
    this.tableHeaders = ['Description', 'SourceID', 'Creater', 'Status', 'ServiceCategory', 'ServiceType', 'Specialty', 'Action'];
  }
  showAppointmentDetails() {
    this.selectedAppointment = null;
    this.isShowAppDetails = true;
  }

  showListingPage(evt) {
    this.isShowAppDetails = false;
  }

  editAppointment(data, mode) {
    console.log(data);
    this.selectedAppointment = { data, mode }
    this.isShowAppDetails = true;
  }

  deleteAppointment(delItem) {
    let params = { Id: delItem.Identifier };
    this.emrService.deleteEmrAppointmentListBy(params)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.emrAppointmentLists.splice(this.emrAppointmentLists.indexOf(delItem), 1);
          this.getEmrAppointmentList();
        }
      })
  }

  getEmrAppointmentList() {
    let params = { 'Id': this.userId, pageNo: this.pageNo, pageSize: 10 }
    this.emrService.getEmrAppointmentListBy(params)
      .subscribe(appLists => {
        this.emrAppointmentLists = appLists.Body.Data.Items;
        this.totalcount = appLists.Body.Data.TotalItemCount;
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
    this.getEmrAppointmentList();
  }

  searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }
}
