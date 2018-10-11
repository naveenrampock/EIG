import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Http } from '@angular/http/src/http';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/src/services/cookie';

@Component({
  selector: 'app-lookupmaster',
  templateUrl: './lookupmaster.component.html',
  styleUrls: ['./lookupmaster.component.css']
})
export class LookupmasterComponent implements OnInit {
  public lkupMasterLists: any;
  private  _uID = Cookie.get('userID');
  lookUpMaster: FormGroup;
  displayDialog: boolean = false;
  selectedData: any;
  categories: any;
  oldData:any;
  newData:any;
  public firstName = Cookie.get('firstName');
  public lastName = Cookie.get('lastName');
  
  constructor(
    private _adminService: AdminService,
    private _FB: FormBuilder
  ) { }

  ngOnInit() {
    this.getLookUpMasterList();
    this.BuildForm();
    this.getCategoryList();
  }
  showDialogToAdd() {
    this.displayDialog = true;
    this.lookUpMaster.reset();
    this.lookUpMaster.get('StatusId').setValue(true);
  }
  getLookUpMasterList() {
    this._adminService.getLookUpMastersList().subscribe((resp) => {
      this.lkupMasterLists = resp.Body.Data;
      

    })
  }
  getCategoryList() {
    this._adminService.getCategoryList().subscribe((resp) => {
      this.categories = resp.Body.Data;
    })
  }

  BuildForm() {
    this.lookUpMaster = this._FB.group({
      Id: [0],
      CategoryId: [],
      Description: [],
      Code: [],
      StatusId: [true]
    })
  }
  saveLookUp() {
    let mData = this.lookUpMaster.value;
    mData.applicationAction = 'Update Master Lookup'
    mData.createdFor = null
    let data = {old:this.oldData,new:mData};
    
   
    data.new.StatusId = data.new.StatusId ? 1 : 0;
    data.new.LogInUser_Guid = this._uID;

    if (data.new.Id > 0) {
      this._adminService.updateLookUpMaster(data).subscribe((resp) => {
      })
      this.getLookUpMasterList();
    }
    else {
      let addData = this.lookUpMaster.value
      addData.LogInUser_Guid = this._uID
      this._adminService.addLookUpMaster(addData).subscribe((resp) => {
      })
      this.getLookUpMasterList();
    }
    this.displayDialog = false;
  }

  delete(data) {
    let id = data.Id
    this._adminService.deleteLookUpMaster(id).subscribe((resp) => {
    })
    this.displayDialog = false;
    this.getLookUpMasterList();
  }
  cancel() {
    this.displayDialog = false;
  }
  edit(sRow) {
    this.oldData = sRow
    this.displayDialog = true;
    this.lookUpMaster.patchValue({
      Id: sRow.Id,
      CategoryId: sRow.CategoryId,
      Code: sRow.Code,
      Description: sRow.Description,
      StatusId: sRow.StatusId
    });
    
  }
}
