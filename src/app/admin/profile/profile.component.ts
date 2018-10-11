import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { SidebarNavComponent } from './../sidebar-nav/sidebar-nav.component';
import { ActivatedRoute } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CONFIG } from './../../core/config/config';
import { ValidationService } from '../../core/validation/validation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('sideNavComponent') sideMenu: SidebarNavComponent;
  patientId: any;
  private loginId = Cookie.get('userID');
  private accountID: any;
  private email: any;
  private profileForm: FormGroup;
  private privacyForm: FormGroup;
  private profileDetails: any;
  private isEdit: boolean = false;
  private notificationsForm: FormGroup;
  private isSeurityTab: boolean = false;
  private isNotifyTab: boolean = false;
  private isShowInvite: boolean = false;
  private isProfile: boolean = false;
  private _sub: any;
  private uID: any;
  private msgs: any;
  private old = {};
  private new = {};
  private id;
  private userConfigForm: FormGroup;
  private deactivate: boolean = false;
  private userGuId: any;
  public userType: number;
  
  constructor(private _FB: FormBuilder, private route: ActivatedRoute, private _Service: AdminService) { }

  ngOnInit() {
    this.isProfile = true;
    this.getId();
    this.profileSettingsForm();
    this.notificationsSettingForm();
    this.initUserConfigForm();
  }



  getId() {
    this._sub = this.route.params.subscribe(params => {
      if (params['Id']) {
        this.uID = (params['Id']);
        Cookie.set('UserUId', this.uID);
        this.getProfileDetails();
      }
    });
  }


  profileSettingsForm() {
    this.profileForm = this._FB.group({

      FirstName: ['', Validators.compose([Validators.required, ValidationService.alphabetsValidation])],
      LastName:  ['', Validators.compose([Validators.required, ValidationService.alphabetsValidation])],
      AccountID: ['', Validators.required],
      CompanyName: [''],
      Position: [''],
      PrimaryEmailId: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      Website: [''],
      PhoneNumber: [''],
      OfficePhoneNumber: [''],
      Address1: [''],
      Address2: [''],
      City: [''],
      State: [''],
      Zipcode: [''],
      UserType: [''],
      Gender: ['']
    })
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  notificationsSettingForm() {

    this.notificationsForm = this._FB.group({
      NotifyByEmail: [''],
      NotifyBlogUpdates: [''],
      NotifyLatestUpdates: [''],
      NotifyUserMessages: [''],
      ReceiveMonthlyNewsletter: [''],

    })
  }

  privacySettingsForm() {
    let prvcyData = this.profileDetails;
    this.privacyForm = this._FB.group({
      CurrentPassword: ['', [Validators.required]],
      NewPassword: ['', [ValidationService.passwordValidator]],
      ConfirmPassword: ['', [ValidationService.passwordValidator]],
      LoginVerification: [{ value: prvcyData.LoginVerification ? 1 : 0, disabled: false }],
      ResetPassword: prvcyData.ResetPassword ? 1 : 0,
      SavePassword: prvcyData.SavePassword ? 1 : 0
    }, { validator: [ValidationService.matchingPasswords, ValidationService.matchingOldPasswords] })
    this.old = this.privacyForm.value
  }

  showFailure(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Current password is wrong. Please enter valid password' });
  }

  saveNotification() {

    let nData = this.notificationsForm.value;
    nData.NotifyBlogUpdates = nData.NotifyBlogUpdates ? 1 : 0;
    nData.NotifyByEmail = nData.NotifyByEmail ? 1 : 0;
    nData.NotifyLatestUpdates = nData.NotifyLatestUpdates ? 1 : 0;
    nData.NotifyUserMessages = nData.NotifyUserMessages ? 1 : 0;
    nData.ReceiveMonthlyNewsletter = nData.ReceiveMonthlyNewsletter ? 1 : 0;
    nData.UpdateTab = 'NotificationSettings';
    nData.applicationAction = 'Update User Notification By Admin'
    nData.createdFor = this.id
    nData.loginId = this.loginId
    nData.userIdentifier = this.uID
    this.new = nData;
    let notificationData = { new: this.new, old: this.old }
    this._Service.saveNotification(notificationData, this.uID).subscribe((res) => {
      this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Notification Saved Succesfully' }];

    })
    setTimeout(() => {
      this.getNotificationById()
    }, 1000)

    // this.getProfileDetails();
  }

  saveSecuritySettings() {
    let secData = this.privacyForm.value;
    let data = this.privacyForm.value;
    let password = secData.NewPassword
    data.userIdentifier = this.uID
    data.accountId = this.accountID
    data.currentPassord = Md5.hashStr(secData.CurrentPassword)
    data.newPassword = Md5.hashStr(secData.NewPassword)
    data.password = password
    data.email = this.email
    data.isAdmin = 1
    let securitySettings = data;
    this._Service.saveSecuritySettings(securitySettings, this.uID).subscribe((res) => {
      if (res.Header.Success == false) {
        this.showFailure(res.Body.Data);
      }
      else {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Settings Saved Succesfully' }];
      }
    })

    this.getProfileDetails();
  }

  getProfileDetails() {
    this._Service.getUserAdminProfileDetailsById(this.uID).subscribe((resp) => {
      resp = resp.Body.Data;
      this.sideMenu.imgUrl = CONFIG.url + resp.imagepath
      this.sideMenu.uID = this.uID;
      Cookie.set('UserPatientId', resp.PatientId);
      this.old = resp;
      this.id = resp.Id;
      this.accountID = resp.AccountID;
      this.email = resp.PrimaryEmailId
      this.userType = resp.UserType;
      this.profileDetails = resp;
      this.getUserConfiguration(resp.UserType);
      this.profileForm.patchValue({
        FirstName: resp.FirstName,
        LastName: resp.LastName,
        AccountID: resp.AccountID,
        CompanyName: resp.CompanyName,
        Position: resp.Position,
        PrimaryEmailId: resp.PrimaryEmailId,
        // linkedaccount: resp.LinkedAccount,
        Website: resp.Website,
        PhoneNumber: resp.PhoneNumber,
        OfficePhoneNumber: resp.OfficePhoneNumber,
        Address1: resp.Address1,
        Address2: resp.Address2,
        City: resp.City,
        State: resp.State,
        Zipcode: resp.Zipcode,
        UserType: resp.UserType,
        Gender: resp.Gender
      })
    })
  }

  private getNotificationById() {
    this._Service.getUserNotificationDetailsById(this.uID).subscribe((resp) => {
      resp = resp.Body.Data;
      this.old = resp;
      this.id = resp.UserId;
      this.notificationsForm = this._FB.group({
        NotifyByEmail: resp.NotifyByEmai ? resp.NotifyByEmai : 0,
        NotifyBlogUpdates: resp.NotifyBlogUpdates ? resp.NotifyBlogUpdates : 0,
        NotifyLatestUpdates: resp.NotifyLatestUpdates ? resp.NotifyLatestUpdates : 0,
        NotifyUserMessages: resp.NotifyUserMessages ? resp.NotifyUserMessages : 0,
        ReceiveMonthlyNewsletter: resp.ReceiveMonthlyNewsletter ? resp.ReceiveMonthlyNewsletter : 0
      })
    })
  }


  saveProfileTab() {
    let pData = this.profileForm.value;
    pData.UpdateTab = 'Profile';
    pData.applicationAction = 'Update User Profile By Admine'
    pData.createdFor = this.id
    pData.loginId = this.loginId
    pData.userIdentifier = this.uID
    this.new = pData;
    let profileData = { new: this.new, old: this.old }
    this._Service.saveSettings(profileData, this.uID).subscribe((res) => {

      this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Profile Saved Succesfully' }];
    })
  }

  editProfile() {
    this.isEdit = true;
  }
  cancel() {
    this.isEdit = false;
  }
  inviteScreen() {
    this.isShowInvite = true;
  }
  settings() {
    this.isShowInvite = false;
  }
  securitySettings() {
    this.isSeurityTab = true;
    if (this.isSeurityTab) {
      this.privacySettingsForm();
    }
  }

  profile() {
    this.isProfile = true;
    if (this.isProfile) {
      this.old = '';
      this.getProfileDetails();
    }
  }

  notificationSettingsTab() {
    this.isNotifyTab = true;
    if (this.isNotifyTab) {
      this.old = '';
      this.getNotificationById();
    }

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
  }

  saveUserConfigTab() {
    let userConfigData = this.userConfigForm.value;
    userConfigData.uId = this.loginId
    if (this.userType === 2) {
      this._Service.adminConfiguration(userConfigData).subscribe(res => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Admin Configuration Saved Succesfully' }];
        this.getUserConfiguration(this.userType);
      })
    }
    else {
      this._Service.userConfiguration(userConfigData).subscribe(res => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'User Configuration Saved Succesfully' }];
        this.getUserConfiguration(this.userType);
      })
    }
  }

  resetConfig() {
  }

  getUserConfiguration(userType) {
    if (userType === 2) {
      this.getAdminConfigurationById();
    }
    else {
      this.getUserConfigurationById();
    }
  }

  getUserConfigurationById() {
    this._Service.getUserConfigurationById(this.uID).subscribe(res => {
      console.log(res.Body.Data);
      let resp = res.Body.Data;
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
        DataStoredId: resp.DataStoredId
      })
    })
  }

  getAdminConfigurationById() {
    this._Service.getAdminConfigurationById(this.uID).subscribe(res => {
      let resp = res.Body.Data;
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
        Maximageviewingtimesperday: resp.Maximageviewingtimesperday
      })
    })
  }

}
