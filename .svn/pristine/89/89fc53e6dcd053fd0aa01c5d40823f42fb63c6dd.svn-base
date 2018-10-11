import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-admin-default',
  templateUrl: './admin-default.component.html',
  styleUrls: ['./admin-default.component.css']
})
export class AdminDefaultComponent implements OnInit {
  userConfigForm: FormGroup;
  uID = Cookie.get('userID');
  msgs: Message[] = [];

  constructor(private _FB: FormBuilder,private _service: AdminService) { }
  
  ngOnInit() {
    this.initAdminConfigForm();
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

    //configuartion tab
    initAdminConfigForm() {
      this.userConfigForm = this._FB.group({
        UId: this.uID,
        HasImagemanagement: [false],
        HasCasemanagement: [false],
        HasEMR: [false],
        HasVideoconference: [false],
        HasGenomicFilesManagement: [false],
        MaxDICOMstudiesnumber: [0],
        MaxDICOMstudiestotalsizes: [0],
        MaxEMRrecordsnumber: [0],
        Maxtotalstoragesize: [0],
        Maxcasesperweek: [0],
        Maxcasesperday: [0],
        Maxinviteesallowed: [0],
        Maxconferencelength: [0],
        Maxtotalnumberofcasesallowed: [0],
        Maximageviewingtimesperday: [0],
        Id:[0]
      })
      this.getAdminDefaultSetting();
    }
    saveUserConfigTab() {
      let userConfigData = this.userConfigForm.value;
      this._service.editAdminDefaultAuthorization(userConfigData).subscribe(res => {
        this.showSuccess(res.status);
        this.getAdminDefaultSetting();
      })
    }
    resetConfig() {
      // this.userConfigForm.reset();
  
    }
    getAdminDefaultSetting() {
      this._service.getAdminDefaultAuthorization().subscribe(res => {
        if (res.Body.Data != null && res.Body.Data != 'undefined'){
        let resp = res.Body.Data;
        this.userConfigForm.patchValue({
          Id:resp.Id,
          HasImagemanagement: resp.HasImagemanagement.data[0],
          HasCasemanagement: resp.HasCasemanagement.data[0],
          HasEMR: resp.HasEMR.data[0],
          HasVideoconference: resp.HasVideoconference.data[0],
          HasGenomicFilesManagement: resp.HasGenomicFilesManagement.data[0],
          MaxDICOMstudiesnumber: resp.MaxDICOMstudiesnumber,
          MaxDICOMstudiestotalsizes: resp.MaxDICOMstudiestotalsizes,
          MaxEMRrecordsnumber: resp.MaxEMRrecordsnumber,
          Maxtotalstoragesize: resp.Maxtotalstoragesize,
          Maxcasesperweek: resp.Maxcasesperweek,
          Maxcasesperday: resp.Maxcasesperday,
          Maxinviteesallowed: resp.Maxinviteesallowed,
          Maxconferencelength: resp.Maxconferencelength,
          Maxtotalnumberofcasesallowed: resp.Maxtotalnumberofcasesallowed,
          Maximageviewingtimesperday: resp.Maximageviewingtimesperday,
          UId: this.uID
        })
      }
      })
    }
}
