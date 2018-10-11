import { Component, OnInit, OnChanges } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, NavigationEnd } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Subject } from 'rxjs/Subject';
import { ValidationService } from '../../core/validation/validation.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { CONFIG } from '../../core';
import { Md5 } from 'ts-md5/dist/md5';
// import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  imgUrl: any;
  profileForm: FormGroup;
  privacyForm: FormGroup;
  userConfigForm: FormGroup;
  profileDetails: any;
  isEdit: boolean = false;
  notificationsForm: FormGroup;
  uID = Cookie.get('userID');
  private email = Cookie.get('email');
  private accountID = Cookie.get('accountID')
  isRequiredToken:boolean = true
  isSeurityTab: boolean = false;
  isNotifyTab: boolean = false;
  getUid = new Subject();
  validationError: any;
  isConfirmEmailOtp: boolean = false;
  isSmsOtp: boolean = false;
  deactivate: boolean = false;
  deleteAccount: boolean = false;
  msgs: Message[] = [];
  private old = {};
  private new = {};
  private id;
  private usersUserId = Cookie.get('userID');

  constructor(private _FB: FormBuilder, private _userService: UserService, private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.profileSettingsForm();
    this.initUserConfigForm();
    this.getUserConfigurationById();
    this.imgUrl = '';
  }

  profileSettingsForm() {
    this.profileForm = this._FB.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      AccountID: ['', Validators.required],
      CompanyName: [''],
      Position: [''],
      PrimaryEmailId: ['', Validators.required],
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
    this.getUserDetails();
  }

  privacySettingsForm() {
    let prvcyData = this.profileDetails;
    this.privacyForm = this._FB.group({
      CurrentPassword: ['', [Validators.required]],
      NewPassword: ['', [ValidationService.passwordValidator]],
      ConfirmPassword: ['', [ValidationService.passwordValidator]],
      LoginVerification: [{ value: prvcyData.LoginVerification ? prvcyData.LoginVerification : 0, disabled: false }],
      ResetPassword: prvcyData.ResetPassword ? prvcyData.ResetPassword : 0,
      SavePassword: prvcyData.SavePassword ? prvcyData.SavePassword : 0
    }, { validator: [ValidationService.matchingPasswords, ValidationService.matchingOldPasswords] })
    this.old =  this.privacyForm.value
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
    this.old =  this.notificationsForm.value
  }

  editProfile() {
    this.isEdit = true;
  }
  cancel() {
    this.isEdit = false;
  }

  securitySettings() {
    this.isSeurityTab = true;
    if (this.isSeurityTab) {
      this.privacySettingsForm();
    }
  }
  notificationSettingsTab() {
    this.isNotifyTab = true;
    if (this.isNotifyTab) {
      this.notificationSettings();
    }
  }

  generateEmailOtp() {
    let data = { email: this.profileDetails.PrimaryEmailId, userGuID: this.uID }
    this._userService.generateOtpViaEmail(data).subscribe(resp => {
      if (resp) {
        this.isConfirmEmailOtp = true;
      }
    })
  }

  confirmEmailOtp(emailOTP) {
    let otpObj = { userGuID: this.uID, otp: emailOTP }
    this._userService.confirmOtpEmail(otpObj).subscribe(resp => {
      if (resp) {
        console.log(resp);
      }
    })
  }

  saveProfileTab() {
    let pData = this.profileForm.value;
    pData.UpdateTab = 'Profile';
    pData.applicationAction = 'Update User Profile'
    pData.createdFor = null
    pData.userIdentifier = this.uID
    pData.loginId = this.uID
    this.new = pData;
    let profileData = {new:this.new,old:this.old}
    this._userService.saveSettings(profileData, this.uID).subscribe((res) => {
      if (res) {
        this.showSuccess(res.message);
        this.getUserDetails();
        this.isEdit = false;
      }
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
    nData.applicationAction = 'Update User Notification'
    nData.createdFor = null
    nData.loginId = this.uID
    nData.userIdentifier = this.uID
    this.new = nData;
    let notificationData = {new:this.new,old:this.old}
    this._userService.saveNotification(notificationData, this.uID).subscribe((res) => {
      if (res) {
        this.showSuccess(res.message);
        this.getUserDetails()
      }
    })
  }

  saveSecuritySettings() {
    let secData = this.privacyForm.value;
    let data = this.privacyForm.value;
    let password = secData.NewPassword
    // secData.UpdateTab = 'SecuritySettings';
    // secData.LoginVerification = secData.LoginVerification ? 1 : 0;
    // secData.ResetPassword = secData.ResetPassword ? 1 : 0;
    // secData.SavePassword = secData.SavePassword ? 1 : 0;
    // secData.CurrentPassword = Md5.hashStr(secData.CurrentPassword)
    // secData.NewPassword = Md5.hashStr(secData.NewPassword)
    // secData.ConfirmPassword = Md5.hashStr(secData.ConfirmPassword)
    // secData.applicationAction = 'Update User Security Settings'
    // secData.createdFor = null


    // data.createdFor = null;
    // data.applicationAction = 'Update User Security Settings'
    data.userIdentifier = this.uID
    data.accountId = 'sumedh'
    data.currentPassord = Md5.hashStr(secData.CurrentPassword)
    data.newPassword = Md5.hashStr(secData.NewPassword)
    data.password = password
    data.email = this.email
    data.accountId = this.accountID
    data.isAdmin = 0
    let securitySettings = data;
    // this.new = secData;
    // let securitySettingData = {new:this.new,old:this.old}
    this._userService.saveSecuritySettings(securitySettings, this.uID).subscribe((res) => {
      if (res.code == 1) {
        this.validationError = 'Current Password does not match. Please provide valid password';
      } else {
        this.showSuccess(res.message);
        this.getUserDetails()
      }
    })
  }

  deactivateStatus(status) {
    if (status) {
      this.confirmDeactivate();

    } else {
      this.deactivate = false;
    }
  }

  DeleteStatus(status) {
    if (status) {
      this.confirmDelete();

    } else {
      this.deleteAccount = false;
    }
  }

  navigateLogin() {
    Cookie.delete('token');
    Cookie.delete('userType');
    Cookie.delete('userID');
    this.router.navigate(['/login']);
  }

  confirmDeactivate() {
    let uId = {uID:this.uID}
    let data = {adminsUserId:"",adminsAccId:"",usersUserId:this.usersUserId}
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {

        this._userService.userDeactivateAcc(data)
          .subscribe((data) => {
            this.showSuccess('Successfully deactiavted');
            setTimeout(() => {
              this.navigateLogin();
            }, 500)

          })
      },
      reject: () => {
        this.deactivate = false;
      }
    });
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {

        this._userService.userDeleleAcc(this.uID)
          .subscribe((data) => {
            this.showSuccess('Successfully deleted');
            setTimeout(() => {
              this.navigateLogin();
            }, 500);
          })

      },
      reject: () => {
        this.deleteAccount = false;

      }
    });
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }

  getUserDetails() {
 
    this._userService.getUserProfileDetailsById(this.uID).subscribe((resp) => {
      
     this.old = resp.Body.Data;
      resp = resp.Body.Data;
      this.profileDetails = resp;
      // if (resp.imagepath) {
      //   this.imgUrl = CONFIG.url + resp.imagepath;
      //   Cookie.set('profilePic', this.imgUrl)
      // }
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

  generateSmsOtp() {
    let data = { phoneNumber: this.profileDetails.PhoneNumber, id: this.uID }
    this._userService.generateOtpViaSMS(data).subscribe(resp => {
      if (resp) {
        this.isSmsOtp = true;
      }
    })
  }

  confirmSmsOtp(smsOTP) {
    let otpObj = { userId: this.uID, otp: smsOTP, isRequiredToken:this.isRequiredToken }
    this._userService.confirmOtpSMS(otpObj).subscribe(resp => {
      if (resp) {
        console.log(resp);
      }
    })
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
      Maximageviewingtimesperday: [0]
    })
    this.getUserConfigurationById();
  }

  saveUserConfigTab() {
    let userConfigData = this.userConfigForm.value;
    userConfigData.userId = this.id
    this._userService.userConfiguration(userConfigData).subscribe(res => {
      this.showSuccess(res.status);
      this.getUserConfigurationById();
    })
  }

  resetConfig() {
  }

  getUserConfigurationById() {
    this._userService.getUserConfigurationById(this.uID).subscribe(res => {
      console.log(res);
      this.id = res.Body.Data.UpdatedBy
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