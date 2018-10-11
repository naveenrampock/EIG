import { Component, OnInit, OnChanges } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserSettingsService } from '../user-settings.service';
import { Router, NavigationEnd } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Subject } from 'rxjs/Subject';
import { ValidationService } from '../../core/validation/validation.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { CONFIG } from '../../core';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.css']
  // styleUrls: ['./log.component.css'],
  // providers: [LogService]
})

export class UserConfigurationComponent {

  userConfigForm: FormGroup;
  uID = Cookie.get('userID');
  private email = Cookie.get('email');
  private accountID = Cookie.get('accountID');
  validationError: any;
  msgs: Message[] = [];
  private old = {};
  private new = {};
  private id;
  private usersUserId = Cookie.get('userID');

  constructor(private _FB: FormBuilder,
    private _userService: UserSettingsService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit() {
    this.initUserConfigForm()
    // this.getUserConfigurationById();

  }

  initUserConfigForm() {
    this.userConfigForm = this._FB.group({
      UserId: this.uID,
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
      DataStoredId:[0]
    })
    this.getUserConfigurationById();
  }

  getUserConfigurationById() {
    this._userService.getUserConfigurationById(this.uID).subscribe(res => {
      let resp = res.Body.Data;
      if (resp) {
        this.userConfigForm.patchValue({
          UserId: this.uID,
          HasImagemanagement: resp.HasImagemanagement,
          HasCasemanagement: resp.HasCasemanagement,
          HasEMR: resp.HasEMR,
          HasVideoconference: resp.HasVideoconference,
          HasGenomicFilesManagement: resp.HasGenomicFilesManagement,
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
          DataStoredId:resp.DataStoredId
        })
      }
    })
  }
}