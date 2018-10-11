import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { Http } from '@angular/http/src/http';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ValidationService } from '../../core/validation/validation.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/primeng';
import { Md5 } from 'ts-md5/dist/md5';
import { SidebarNavComponent } from './../sidebar-nav/sidebar-nav.component';
import { CONFIG } from './../../core/config/config';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @ViewChild('sideNavComponent') sideMenu: SidebarNavComponent;
  adminConfigForm: FormGroup;
  isSmsOtp: boolean;
  profileForm: FormGroup;
  privacyForm: FormGroup;
  private isProfile: boolean = false;

  profileDetails: any;
  isEdit: boolean = false;
  notificationsForm: FormGroup;
  isShowInvite: boolean = false;
  uID = Cookie.get('userID');
  private email = Cookie.get('email');
  private accountID = Cookie.get('accountID')
  isSeurityTab: boolean = false;
  isNotifyTab: boolean = false;
  getUid = new Subject();
  validationError: any;
  isConfirmEmailOtp: boolean = false;
  deactivate: boolean = false;
  deleteAccount: boolean = false;
  msgs: Message[] = [];
  isRequiredToken: boolean = true;
  private id: any;
  private loginId = Cookie.get('userID');
  private old = {};
  private new = {};
  private usersUserId = Cookie.get('userID');
  public firstName = Cookie.get('firstName')
  public lastName = Cookie.get('lastName')


  constructor(private _FB: FormBuilder,
    private _service: AdminService,
    private router: Router,
    private confirmationService: ConfirmationService) { }


  ngOnInit() {
    this.isProfile = true;
    this.profileSettingsForm();
    this.initUserConfigForm();
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Data added successfully', detail: msg });
  }

  showFailure(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Current password is wrong. Please enter valid password' });
  }
  profileSettingsForm() {
    this.profileForm = this._FB.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      AccountID: ['', Validators.required],
      CompanyName: [''],
      Position: [''],
      PrimaryEmailId: [''],
      // linkedaccount: [''],
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
    });
    this._service.getUserAdminProfileDetailsById(this.uID).subscribe((resp) => {
      this.old = resp.Body.Data;
      resp = resp.Body.Data;
      this.sideMenu.imgUrl = CONFIG.url + resp.imagepath
      this.sideMenu.loginUserEditProfile = true
      this.sideMenu.uID = this.uID;
      this.profileDetails = resp;
      console.log(resp);
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

  privacySettingsForm() {
    let prvcyData = this.profileDetails;
    this.privacyForm = this._FB.group({
      CurrentPassword: ['', [Validators.required]],
      NewPassword: ['', [ValidationService.passwordValidator]],
      ConfirmPassword: ['', [ValidationService.passwordValidator]],
      LoginVerification: [{ value: prvcyData.LoginVerification ? prvcyData.LoginVerification.data : 0, disabled: false }],
      ResetPassword: prvcyData.ResetPassword ? prvcyData.ResetPassword.data : 0,
      // SavePassword: prvcyData.SavePassword ? prvcyData.SavePassword.data[0] : 0
    }, { validator: [ValidationService.matchingPasswords, ValidationService.matchingOldPasswords] })
    this.old = this.privacyForm.value
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  notificationSettings() {
    let notifyData = this.profileDetails;
    this.notificationsForm = this._FB.group({
      NotifyByEmail: notifyData.NotifyByEmail ? notifyData.NotifyByEmail : 0,
      NotifyBlogUpdates: notifyData.NotifyBlogUpdates ? notifyData.NotifyBlogUpdates : 0,
      NotifyLatestUpdates: notifyData.NotifyLatestUpdates ? notifyData.NotifyLatestUpdates : 0,
      NotifyUserMessages: notifyData.NotifyUserMessages ? notifyData.NotifyUserMessages : 0,
      ReceiveMonthlyNewsletter: notifyData.ReceiveMonthlyNewsletter ? notifyData.ReceiveMonthlyNewsletter : 0
    })
    this.old = this.notificationsForm.value
  }

  deactivateStatus(status) {
    if (status) {
      this.confirmDeactivate()
    } else {
      this.deactivate = false;
    }
    console.log(status);
  }

  DeleteStatus(status) {
    if (status) {
      this.confirmDelete()
    } else {
      this.deleteAccount = false;
    }
  }


  editProfile() {
    this.isEdit = true;
  }
  profile() {
    this.isProfile = true;
    if (this.isProfile) {
      this.old = '';
      this.profileSettingsForm();
    }
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
      // this.privacySettingsForm.get('')
    }
  }
  notificationSettingsTab() {
    this.isNotifyTab = true;
    if (this.isNotifyTab) {
      this.old = '';
      // this.getNotificationById();
      this.notificationSettings()
    }

  }

  generateEmailOtp() {
    let data = { email: this.profileDetails.PrimaryEmailId, userGuID: this.uID }
    console.log(data);
    this._service.generateOtpViaEmail(data).subscribe(resp => {
      if (resp) {
        this.isConfirmEmailOtp = true;
      }
    })
  }
  confirmEmailOtp(emailOTP) {
    console.log(emailOTP);
    let otpObj = { EmailOTP: emailOTP, userGuID: this.uID }
    console.log(otpObj);
    this._service.confirmOtpEmail(otpObj).subscribe(resp => {
      if (resp) {
        console.log(resp);
      }
    })
  }



  saveProfileTab() {
    let pData = this.profileForm.value;
    pData.UpdateTab = 'Profile';
    pData.applicationAction = 'Admin updated by himself'
    pData.createdFor = null
    pData.loginId = this.loginId
    pData.userIdentifier = this.uID
    this.new = pData;
    let profileData = { new: this.new, old: this.old }
    this._service.saveSettings(profileData, this.uID).subscribe((res) => {

      this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Profile Saved Succesfully' }];
    })
  }

  private getNotificationById() {
    this._service.getUserNotificationDetailsById(this.uID).subscribe((resp) => {
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

  saveNotification() {

    let nData = this.notificationsForm.value;
    nData.NotifyBlogUpdates = nData.NotifyBlogUpdates ? 1 : 0;
    nData.NotifyByEmail = nData.NotifyByEmail ? 1 : 0;
    nData.NotifyLatestUpdates = nData.NotifyLatestUpdates ? 1 : 0;
    nData.NotifyUserMessages = nData.NotifyUserMessages ? 1 : 0;
    nData.ReceiveMonthlyNewsletter = nData.ReceiveMonthlyNewsletter ? 1 : 0;
    nData.UpdateTab = 'NotificationSettings';
    nData.applicationAction = 'Admin updated by himself'
    nData.createdFor = null
    nData.loginId = this.loginId
    nData.userIdentifier = this.uID
    this.new = nData;
    let notificationData = { new: this.new, old: this.old }
    this._service.saveNotification(notificationData, this.uID).subscribe((res) => {
      this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Notification Saved Succesfully' }];

    })
    setTimeout(() => {
      // this.getNotificationById()
      this.ngOnInit()
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
    data.isAdmin = 0
    let securitySettings = data;
    // this.new = secData;
    // let securitySettingData = {new:this.new,old:this.old}
    this._service.saveSecuritySettings(securitySettings, this.uID).subscribe((res) => {
      if (res.code == 1) {
        this.validationError = 'Current Password does not match. Please provide valid password';
      } else {
        if (res.Header.Success == false) {
          this.showFailure(res.Body.Data);
        }
        else {
          this.showSuccess(res.message);
          this.ngOnInit()
        }
      }
    })

  }

  navigateLogin() {
    Cookie.delete('token');
    Cookie.delete('userType');
    Cookie.delete('userID');
    this.router.navigate(['/login']);
  }

  confirmDeactivate() {
    let data = { adminsUserId: "", adminsAccId: "", usersUserId: this.usersUserId }

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {

        this._service.adminDeactivateAcc(data)
          .subscribe((data) => {
            console.log(data);
            this.navigateLogin();

          })
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have Deactivated' }];
      },
      reject: () => {
        this.deactivate = false;
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {

        this._service.adminDeleleAcc(this.uID, this.uID)
          .subscribe((data) => {
            console.log(data);
            this.navigateLogin();
          })

      },
      reject: () => {
        this.deleteAccount = false;

      }
    });
  }
  generateSmsOtp() {
    let data = { phoneNumber: this.profileDetails.PhoneNumber, id: this.uID }
    console.log(data);
    this._service.generateOtpViaSMS(data).subscribe(resp => {
      if (resp) {
        this.isSmsOtp = true;
      }
    })
  }
  // confirmSmsOtp(smsOTP) {
  //   console.log(smsOTP);
  //   let otpObj = { userId: this.uID, otp: smsOTP }
  //   console.log(otpObj);
  //   this._service.confirmOtpEmail(otpObj).subscribe(resp => {
  //     if (resp) {
  //       console.log(resp);
  //     }
  //   })
  // }

  confirmSmsOtp(smsOTP) {
    let otpObj = { userId: this.uID, otp: smsOTP, isRequiredToken: this.isRequiredToken }
    this._service.confirmOtpSMS(otpObj).subscribe(resp => {
      if (resp) {
        console.log(resp);
      }
    })
  }
  //configuartion tab
  initUserConfigForm() {
    this.adminConfigForm = this._FB.group({
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
      Maximageviewingtimesperday: [0]
    })
    this.getAdminConfigurationById();
  }
  saveUserConfigTab() {
    let userConfigData = this.adminConfigForm.value;
    userConfigData.uId = this.loginId;
    this._service.adminConfiguration(userConfigData).subscribe(res => {
      this.showSuccess(res.status);
      this.getAdminConfigurationById();
    })
  }
  resetConfig() {
    // this.userConfigForm.reset();

  }
  getAdminConfigurationById() {
    this._service.getAdminConfigurationById(this.uID).subscribe(res => {
      let resp = res.Body.Data;
      if (resp) {
        this.adminConfigForm.patchValue({
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
      }
    })
  }
}
