import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ResponseType } from '@angular/http';
import { CanActivatedAuthGuard, ValidationService, Validation } from '../core/index'
import { AuthService } from '../core/dataservice/auth.service'
//import { LoginServices } from './login.services';
import { EmitService } from './../core/emit/emit.service';
import { ToastService } from './../core/toast/toast.service';
import { CONFIG, PageLabel, captcha } from './../core/';
import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ChatService } from '../message/chat.service';
import { HttpService } from '../message/http.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../user/user.service';
import { RefreshService } from '../core/dataservice/refresh.service'
import { AuthService as auth } from "angular2-social-login";
import { RegisterService } from '../register/register.service';


@Component({
  selector: 'hws-am-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isCaptcha: boolean = false;
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  msgs: any;
  isForgotPwd: boolean = false;
  isUserDevice: boolean = false;
  isConfirmOtp: boolean = false;
  isSms: boolean = false;
  uID = Cookie.get('userID');
  enterEmail: any = "";
  enterSms: any = "";
  public otp: any;
  deviceUID = Cookie.get('DeviceUID');
  saveUserName: boolean = false;
  saveUser: any = "";
  loginToken: any;
  loginUserType: any;
  loginUserID: any;
  providerImage: any;
  isEmail: boolean = true;
  isUserDeviceNeeded: boolean = true;
  provider: number;
  isDeviceSave: boolean = false;
  isUserPwd: boolean = false;
  otpTypes: any;
  public pwdForm: FormGroup;
  public userNameEmail: any;
  public userPwdId: any;
  showSuccess: boolean = false;
  pwdOtpTypes: any = [{ otpType: 'Email', showEmail: false, showSms: false }, { otpType: 'SMS', showEmail: false, showSms: false }]
  recaptchaKey = captcha.captachKey;

  constructor(private router: Router,
    private authService: AuthService,
    private emitService: EmitService,
    private translate: TranslateService,
    private toastService: ToastService, private fb: FormBuilder,
    private chatService: ChatService, private _userService: UserService,
    private _registerService: RegisterService,
    private ref: ChangeDetectorRef,
    private refreshService: RefreshService,
    public _auth: auth) {
    translate.setDefaultLang('en');

    this.loginForm = fb.group({
      'email': ['', Validators.required,],
      'password': ['', Validators.required],
      'saveUserName': ['']
    })

    this.forgotPasswordForm = this.fb.group({
      emailId: ['', Validators.required],
      accountId: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private isAuthenticated: boolean = true;
  private sub: Subscription;
  private formFields = {};
  isValid: boolean = false;
  private userType: any;
  private setUserTypeValue: any;
  private userId: any;
  inValidvalue: any;
  name: any;
  isForgotUserName: boolean = false;
  isShowPwdDetails: boolean = false;

  switchLanguage(language: string) {
    localStorage.setItem("lng_ls", language)
    this.translate.use(language);
  }
  selectUserType(selectType) {
    this.userType = selectType;
  }

  ngOnInit() {
    // localStorage.setItem("lng_ls", "en");
    this.userType = 1;
    this.isCaptcha = true;
    this.pwdSettingsForm();
    //console.log(this.recaptchaKey);
    this.savedUserName();
  }

  savedUserName() {
    this.saveUser = Cookie.get('userName');
    if (this.saveUser) {
      this.saveUserName = true;
    }
    else {
      this.saveUserName = false;
    }
    this.loginForm.patchValue({
      'email': this.saveUser,
      'saveUserName': this.saveUserName
    })
  }

  // Login  User
  login(value: any) {
    let userName = value.email.trim();
    let passWord = value.password.trim();
    let password = Md5.hashStr(passWord)

    let params = { username: userName, password: password, devicetype: 'web' }
    this.authService.doLogin(params).subscribe((resp: any) => {
      if (resp.Header.Success == false) {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
        return this.msgs
      }
      else {
        if (value.saveUserName) {
          Cookie.set('userName', resp.Body.Data.accountID);
        }
        else {
          Cookie.delete('userName');
        }
        if (resp.Body.Data.email) {
          this.enterEmail = resp.Body.Data.email;
        }
        if (resp.Body.Data.phoneNo) {
          this.enterSms = resp.Body.Data.phoneNo;
        }
        this.loginToken = resp.Body.Data.token;
        this.loginUserType = resp.Body.Data.userType;

        localStorage.setItem('accountId_ls', resp.Body.Data.accountID);
        localStorage.setItem("userId_ls", resp.Body.Data.userID);

        localStorage.setItem("lng_ls", resp.Body.Data.browserLanguage ? resp.Body.Data.browserLanguage : 'en');
        this.translate.use(resp.Body.Data.browserLanguage ? resp.Body.Data.browserLanguage : 'en');


        if (this.isUserDeviceNeeded) {
          this.UserDeviceVerification(resp.Body.Data.userID, resp.Body.Data.email, resp.Body.Data.phoneNo);
        }
        else {
          this.setTokenAndRedirectHome();
        }
      }
    })
  }

  selectDeviceOtpType(evt) {
    if (evt.type == 'SMS') {
      this.isSms = true;
      this.isEmail = false;
    }
    else {
      this.isSms = false;
      this.isEmail = true;
    }
  }

  generateDeviceOtp(enterSms, enterEmail) {
    let userId = Cookie.get('userID');

    if (this.isEmail && enterEmail) {
      let data = { email: enterEmail, userGuID: userId }
      this._userService.generateOtpViaEmail(data).subscribe(resp => {
        if (resp.Header.Success == false) {
          this.isConfirmOtp = false;
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'Email-Id you provided is not exist in medicamind account' }];
          return this.msgs;
        } else {
          this.isConfirmOtp = true;
          this.isUserPwd = true;
          this.msgs = [{ severity: 'success', summary: 'Success Message', detail: resp.Header.Message }];
          return this.msgs;
        }
      })
    }
    else if (this.isSms && enterSms) {
      let data = { phoneNumber: enterSms, id: userId }
      this._userService.generateOtpViaSMS(data).subscribe(resp => {
        if (resp.Header.Success == false) {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'Input field is invalid' }];
          this.isConfirmOtp = false;
        } else {
          this.isConfirmOtp = true;
          this.isUserPwd = true;
        }
      })
    }
    else {
      this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'Input field is empty.' }];
    }
  }

  saveDeviceInfo(enterEmail, enterSms, otp, isDeviceSave, provider) {
    var uId = Cookie.get('userID');
    var params;
    if (provider) {
      params = { userId: uId, otp: this.otp, deviceName: "webBrowser", isEmail: this.isEmail, isSaveDevice: isDeviceSave }
    }
    else {
      params = { userId: uId, otp: this.otp, deviceName: "webBrowser", isEmail: this.isEmail, isSaveDevice: isDeviceSave }
    }
    this._userService.saveUserDevice(params).subscribe(resp => {
      if (resp.Header.Success == false) {
        // if (resp.Header.MessageType === "otp") {
        //   this.clearUserDevice(1, 1);
        // }
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
        return this.msgs;
      }
      else {
        if (resp.Body.Data.Guid) {
          Cookie.set("DeviceID", resp.Body.Data.Guid, 999999999);
        }
        this.setTokenAndRedirectHome();
      }
    });
  }

  clearUserDevice(isCookieDelete, isPageRefresh) {
    this.enterEmail = "";
    this.enterSms = "";
    this.otp = "";
    this.isUserDevice = false;
    this.isSms = false;
    this.isEmail = false;
    this.isConfirmOtp = false;
    if (isCookieDelete) {
      Cookie.delete('token');
      Cookie.delete('userType');
      Cookie.delete('userID');
      Cookie.delete('profilePic');
      Cookie.delete('Id');
    }
    if (isPageRefresh) {
      this.router.navigate(['/login']);
      window.location.reload();
    }
  }

  openForgotPwd() {
    this.isForgotPwd = true;
  }

  reset(captchaResponse) {
    console.log(captchaResponse);
  }

  signIn(provider) {
    switch (provider) {
      case "facebook":
        this.provider = 1;
        break;
      case "google":
        this.provider = 2;
        break;
      default:
        this.provider = 0;
        break;
    }

    this.sub = this._auth.login(provider).subscribe(
      (res: any) => {
        this.providerImage = res.image;
        let accountType = this.provider;
        if (accountType > 0) {
          this.SingleSignOn(res.provider, res.uid, res.email);
        }
        else {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: "Invalid linked account" }];
          return this.msgs;
        }
      }
    )
    this._auth.logout();
  }

  SingleSignOn(accountProvider, accountId, accountEmail) {
    let params = { LinkedAccountUId: accountId, LinkedAccountProvider: accountProvider, LinkedEmail: accountEmail }
    this.authService.doSingleSignOn(params).subscribe((resp: any) => {
      if (resp.Header.Success == false) {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
        return this.msgs;
      }
      else {
        this.loginToken = resp.Body.Data.token;
        this.loginUserType = resp.Body.Data.userType;

        if (resp.Body.Data.email) {
          this.enterEmail = resp.Body.Data.email;
        }
        if (resp.Body.Data.phoneNo) {
          this.enterSms = resp.Body.Data.phoneNo;
        }
        localStorage.setItem('accountId_ls', resp.Body.Data.accountID)
        localStorage.setItem("userId_ls", resp.Body.Data.userID)
        if (this.isUserDeviceNeeded) {
          return this.UserDeviceVerification(resp.Body.Data.userID, resp.Body.Data.email, resp.Body.Data.phoneNo);
        }
        else {
          this.setTokenAndRedirectHome();
        }
      }
    })
    this._auth.logout().subscribe((resp: any) => {
      let x = resp;
    });
  }

  UserDeviceVerification(userGuid, userEmail, userPhoneNumber) {
    this.deviceUID = Cookie.get("DeviceID");
    if (this.deviceUID) {
      this._userService.isUserDeviceValid(this.deviceUID, userGuid).subscribe((resp: any) => {
        if (resp === true) {
          this.setTokenAndRedirectHome();
        }
        else {
          if (userEmail && userPhoneNumber) {
            this.otpTypes = [{ type: 'Email', disabled: 'n' }, { type: 'SMS', disabled: 'n' }];
          }
          else if (!userPhoneNumber && userEmail) {
            this.otpTypes = [{ type: 'Email', disabled: 'n' }, { type: 'SMS', disabled: 'y' }];
          }
          else if (!userEmail && userPhoneNumber) {
            this.otpTypes = [{ type: 'Email', disabled: 'y' }, { type: 'SMS', disabled: 'n' }];
          }
          else {
            this.otpTypes = [{ type: 'Email', disabled: 'n' }, { type: 'SMS', disabled: 'n' }];
          }
          this.isUserDevice = true;
          // this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'This is not registered device' }];
          // return this.msgs;
          this.ref.detectChanges();
          return true;
        }
      });
    }
    else {

      if (userEmail && userPhoneNumber) {
        this.otpTypes = [{ type: 'Email', disabled: 'n' }, { type: 'SMS', disabled: 'n' }];
      }
      else if (!userPhoneNumber && userEmail) {
        this.otpTypes = [{ type: 'Email', disabled: 'n' }, { type: 'SMS', disabled: 'y' }];
      }
      else if (!userEmail && userPhoneNumber) {
        this.otpTypes = [{ type: 'Email', disabled: 'y' }, { type: 'SMS', disabled: 'n' }];
      }
      else {
        this.otpTypes = [{ type: 'Email', disabled: 'n' }, { type: 'SMS', disabled: 'n' }];
      }
      // this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'This is not registered device' }];
      // return this.msgs;
      this.isUserDevice = true;
      this.ref.detectChanges();
      return true;
    }

  }

  setTokenAndRedirectHome() {
    Cookie.set('isUserDeviceValid', 'true', 999999999);
    let data = Cookie.get('profilePic')
    this.refreshService.changeMessage(data)
    this.router.navigate(['/home']);
  }
  openForgotUsername() {
    this.isForgotUserName = true;
  }
  resetPassword() {
    this._userService.getUserName(this.userNameEmail).subscribe((resp: any) => {
      if (resp.Header.Success == true) {
        this.msgs = [{ severity: 'success', summary: 'Success Message', detail: resp.Header.Message }];
        return this.msgs
      }
      else {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
        return this.msgs
      }
    })
    this.isForgotUserName = false;
    this.userNameEmail = '';
  }

  selectPwdOtpType(evt) {
    if (evt.otpType == 'SMS') {
      this.isSms = true;
      this.isEmail = false;
    }
    if (evt.otpType == 'Email') {
      this.isSms = false;
      this.isEmail = true;
    }
  }

  pwdSettingsForm() {
    this.pwdForm = this.fb.group({
      NewPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      ConfirmPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      NewForgotPasswordOtp: ['', Validators.required]
    }, { validator: [ValidationService.matchingPasswords, Validators] })
  }

  savePwdConfirmInfo() {
    var data = this.pwdForm.value;
    var passWord = data.ConfirmPassword.trim();
    let password = Md5.hashStr(passWord)
    let data1 = {
      accountId: this.userPwdId,
      password: password,
      otp: data.NewForgotPasswordOtp,
      isEmail: this.isEmail
    }
    this._userService.saveForgotPwd(data1).subscribe((resp: any) => {
      if (resp.Header.Success == true) {
        this.msgs = [{ severity: 'success', summary: 'Success Message', detail: resp.Header.Message }];
        this.isShowPwdDetails = false;
        this.isForgotPwd = false;
        this.showSuccess = true;
      } else {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
        return this.msgs;
      }

    }

    )
    this.userPwdId = '';
    this.pwdForm.patchValue({
      NewPassword: '',
      ConfirmPassword: '',
      NewForgotPasswordOtp: ''
    })

  }

  generateForgotPasswordOtp() {
    let data1 = {
      accountId: this.userPwdId,
      isEmail: this.isEmail
    }
    this._userService.getForgotPasswordOtp(data1).subscribe((resp: any) => {
      if (resp.Header.Success == true) {
        this.msgs = [{ severity: 'success', summary: 'Success Message', detail: resp.Header.Message }];
        this.isShowPwdDetails = true;
      } else {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
        return this.msgs;
      }
    })
  }

  sucessPopup() {
    this.showSuccess = false;
  }
}


