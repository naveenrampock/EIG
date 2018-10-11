import { Component, OnInit } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-ccd',
  templateUrl: './ccd.component.html',
  styleUrls: ['./ccd.component.css']
})
export class CcdComponent implements OnInit {
  selectedAll: any;
  public tableHeaders = [];
  public isShowCcdDetails: boolean = false;
  public isShowaddCcdDetails: boolean = false;
  public isViewAllDetails: boolean = false;
  public ccdList: Array<any> = [];
  public selectedCcd: any;
  public totalcount: number;
  private pageNo: number = 1;
  private uID = Cookie.get('userID');
  private id = Cookie.get('Id');
  private uType = Cookie.get('userType');
  SelectedIDs: any[];
  constructor(private service: EmrService) { }

  ngOnInit() {
    // this.ccdList = [{ 'DateAdded': "6/28/2018 10:22:21 AM", "Description": "problems-and-medications.xmproblems-and-medications.xm", "Fromp": "problems-and-medications.xmproblems-and-medications.xmproblems-and-medications.xm", "Notes": "problems-and-medications.xml problems-and-medications.xml" },
    // { 'DateAdded': "6/18/2018 10:22:21 AM", "Description": "problems-and-medications.xmproblems-and-medications.xm", "Fromp": "problems-and-medications.xmproblems-and-medications.xmproblems-and-medications.xm", "Notes": "problems-and-medications.xml problems-and-medications.xml" }
    // ]
    this.tableHeaders = ['Date Added', 'Description', 'From', 'Items added to HealthVault?', 'Notes']

      this.getCcdList()
  }

  getCcdList() {
    const data = { Id: this.id, pageNo: this.pageNo, pageSize: 10 }
    this.service.getCcdList(data)
      .subscribe((res) => {
        this.ccdList = res.Body.Data.ccdList;
        console.log(res)
        this.totalcount = res.Body.Data.TotalItemCount;
      })

  }

  showConditionDetails() {
    this.isShowCcdDetails = true;
  }

  showListingPage() {
    console.log('came from details');
    this.isShowCcdDetails = false;

  }

  showAddListingPage() {
    this.isShowaddCcdDetails = false;
  }

  loadLazy(LazyLoadEvent) {
    let count = (LazyLoadEvent.first + 10) / 10;
    this.pageNo = Math.ceil(count);
  }

  selectAll() {
    for (var i = 0; i < this.ccdList.length; i++) {
      this.ccdList[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.ccdList.every(function (item: any) {
      return item.selected == true;
    })
  }

  editCondition(rowData) {
    console.log(rowData);
    rowData.isViewDetails = !rowData.isViewDetails;
    // this.showPopup = true;
  }

  addConditionDetails() {
    this.isShowaddCcdDetails = true;
  }

  gotoViewDetails() {
    this.isViewAllDetails = true;
  }

  showDetailsListingPage() {
    this.isViewAllDetails = false;
  }

  selectID(id, event: any) {
    this.SelectedIDs.push(id);
  }


  deleteConditionDetails() {
    let i = 0;
    for (i = 0; i < this.ccdList.length; i++) {
      if (this.ccdList[i].selected) {
        console.log(this.ccdList[i]);
        this.ccdList.splice(i, 1);
        i--;
      }
    }
  }
}
