import { Component, OnInit } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-ccr',
  templateUrl: './ccr.component.html',
  styleUrls: ['./ccr.component.css']
})
export class CcrComponent implements OnInit {
  selectedAll: any;
  public tableHeaders = [];
  public isShowCcrDetails: boolean = false;
  public isShowaddCcrDetails: boolean = false;
  public isViewAllDetails : boolean = false;
  public ccrList: Array<any> = [];
  public selectedCcd: any;
  public totalcount: number;
  private pageNo: number = 1;
  private uID = Cookie.get('userID');
  private id = Cookie.get('Id');
  private uType = Cookie.get('userType');
  constructor(private service: EmrService) { }


  ngOnInit() {
     this.ccrList = [{ 'DateAdded': "6/28/2018 10:22:21 AM", "Description": "ccrsample_Allscripts.xml", "Fromp": "Site: 3","Notes": "ccrsample_Allscripts.xml " },
    { 'DateAdded': "6/18/2018 10:22:21 AM", "Description": "ccr_mttaboros.xml", "Fromp": "", "Notes": "ccrsample_Allscripts.xml " }
    ]
  }
  addCcrListItems() {
    console.log("working");
  }
  
  loadLazy(LazyLoadEvent) {
    let count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
  }

  selectAll() {
    for (var i = 0; i < this.ccrList.length; i++) {
      this.ccrList[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.ccrList.every(function (item: any) {
      return item.selected == true;
    })
  }

  editCondition(rowData) {
    console.log(rowData);
    rowData.isViewDetails = !rowData.isViewDetails;
  }
  
  gotoViewDetails() {
    this.isViewAllDetails = true;
  }

  showDetailsListingPage() {
    this.isViewAllDetails = false;
  }

  addConditionDetails() {
    this.isShowaddCcrDetails = true;
  }

  showConditionDetails() {
    this.isShowCcrDetails = true;
  }

  showListingPage() {
    console.log('came from details');
    this.isShowCcrDetails = false;
  }

  showAddListingPage() {
    this.isShowaddCcrDetails = false;
  }
}
