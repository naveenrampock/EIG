import { Component, OnInit, ViewChild } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrNavigationComponent } from '../emr-navigation/emr-navigation.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  @ViewChild (EmrNavigationComponent) emrnavigation: EmrNavigationComponent;
  public isShowDeviceDetails: boolean = false;
  public tableHeaders: string[];
  public listEmrDevice: Array<any> = [];
  public selectedDevice: any;
  private userId = Cookie.get('Id');
  public msgs: any[];
  public totalcount: any;
  public press: boolean = false;
  public alpha: string ="";
  private pageNo: number = 0;

  constructor(private emrService: EmrService) { }

  ngOnInit() {
    this.tableHeaders = ['Name', 'SourceType', 'SourceID','Creater', 'DeviceIdentifier', 'Jurisdiction', 'CarrierHRF', 'Action']
  }

  showDeviceDetails() {
    this.selectedDevice = null;
    this.isShowDeviceDetails = true;
  }

  showDeviceListingPage() {
    console.log('came from details');
    this.isShowDeviceDetails = false;
  }

  public editDevice(data, mode) {
    this.selectedDevice = { data, mode };
    this.isShowDeviceDetails = true;
  }

  public deleteDevices(delItem) {
    this.emrService.deleteEmrDevice(delItem.Id, this.userId)
      .subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Header.Message);
          this.listEmrDevice.splice(this.listEmrDevice.indexOf(delItem), 1);
          this.getEmrDeviceList();
        }
      })
  }

  public loadLazy(LazyLoadEvent) {
    const count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
    this.getEmrDeviceList();
  }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private getEmrDeviceList() {
    let params = { 'Id': this.userId, PageNo: this.pageNo, PageSize: 10 }
    this.emrService.getEmrDevice(params)
      .subscribe(deviceLists => {
        this.listEmrDevice = deviceLists.Body.Data.Items;
        this.listEmrDevice.map(dv => {
          dv.Udi = JSON.parse(dv.Udi);
        })
        this.totalcount = deviceLists.Body.Data.TotalItemCount;
      })
      this.emrnavigation.getTotalList();
  }
  
  searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true :
      setTimeout(() => {
        this.press = false
      }, 400);
  }
}
