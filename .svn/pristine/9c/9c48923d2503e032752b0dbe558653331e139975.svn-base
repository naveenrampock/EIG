import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-default',
  templateUrl: './user-default.component.html',
  styleUrls: ['./user-default.component.css']
})
export class UserDefaultComponent implements OnInit {
  userConfigForm: FormGroup;
  uID = Cookie.get('userID');
  msgs: Message[] = [];
  public firstName = Cookie.get('firstName')
  public lastName = Cookie.get('lastName') 


  constructor(private _FB: FormBuilder,private _service: AdminService) { }
  
  ngOnInit() {
    this.initUserConfigForm();
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

    //configuartion tab
    initUserConfigForm() {
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
        Id:[0],
        DataStoredId:[0]
      })
      this.getUserDefaultSetting();
    }
    saveUserConfigTab() {
      let userConfigData = this.userConfigForm.value;
      this._service.editUserDefaultConfiguration(userConfigData).subscribe(res => {
        this.showSuccess(res.status);
        this.getUserDefaultSetting();
      })
    }
    resetConfig() {
      // this.userConfigForm.reset();
  
    }
    getUserDefaultSetting() {
      this._service.getUserDefaultSetting().subscribe(res => {
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
          UId: this.uID,
          DataStoredId: resp.DataStoredId
        })
      }
      })
    }
}
