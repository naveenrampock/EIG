import { Component, OnInit } from '@angular/core';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from "angular2-social-login";
import { RegisterService } from '../register/register.service';
import { Router } from '@angular/router';
import { ValidationService } from '../core/validation/validation.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Password } from 'primeng/primeng';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg: string;
  private sub: Subscription;
  registerForm: FormGroup;
  showSuccess: boolean = false;
  successMessage: any = "You have successfully registered, please check your registered email and activate the account";
  provider: number;
  deviceInfo = null;
  public errorMessage: any;
  public validationError: any;
  public validationErrorAccountId: any;
  public validationAccError: any;
  public errorMessageAccId: any
  public errorMessageAccountId: any;
  public validationPassBlank: any;
  public errorMessageBlankPass: any;
  private _checkSaveAccId: any = 0;
  private _checkSavePassword: any = 0;
  msgs: any;
  isReadOnly:boolean = false;

  constructor(private _fb: FormBuilder, public _auth: AuthService, private _registerService: RegisterService, private _router: Router,
    // private _deviceService: DeviceDetectorService
  ) {
    // this.epicFunction();
  }

  ngOnInit() {
    this.BuildRegnForm();
  }

  check(e) {
    if (e.keyCode == 32) {
      this.validationErrorAccountId = 1;
      this.errorMessageAccId = "Blank spaces not allowed";
      return false;
    }
    else {
      this.validationErrorAccountId = 0;
      return true
    }
  }

  checkPassword(e) {
    if (e.keyCode == 32) {

      this.validationPassBlank = 1;
      this.validationError = 0;
      this.errorMessageBlankPass = "Blank spaces not allowed";
      return false;
    }
    else {
      this.validationPassBlank = 0;
      return true
    }
  }

  BuildRegnForm() {
    this.registerForm = this._fb.group({
      AccountID: ['', Validators.required],
      FirstName: ['', Validators.compose([Validators.required, ValidationService.alphabetsValidation])],
      LastName: ['', Validators.compose([Validators.required, ValidationService.alphabetsValidation])],
      PrimaryEmailId: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      PhoneNumber: [],
      UserType: [3],
      Password: ['',Validators.compose([Validators.required, ValidationService.passwordValidator])],
      ConfirmPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
      LinkedAccountUId: [''],
      LinkedAccountProvider: ['']
    })
  }

  signup() {
    let signupData = this.registerForm.value;
    this._checkSaveAccId = 0;
    this._checkSavePassword = 0;
    var inputAccid;
    inputAccid = signupData.AccountID.split('')
    var checkSpaceInAccID = inputAccid
    for (let i = 0; i < checkSpaceInAccID.length; i++) {
      let value;
      value = checkSpaceInAccID[i]
      if (value === " ") {
        this._checkSaveAccId = 1
        this._checkSavePassword = 0;
      }
    }
    var inputPass;
    inputPass = signupData.Password.split('')
    var checkSpaceInPass = inputPass
    for (let i = 0; i < checkSpaceInPass.length; i++) {
      let value1;
      value1 = checkSpaceInPass[i]
      if (value1 === " ") {
        this._checkSavePassword = 1
        this._checkSaveAccId = 0
      }
    }
    // if (signupData.Password.trim().length == 0) {
    //   this.validationError = 1;
    //   this.validationPassBlank = 0;
    //   this.errorMessage = "Empty String Not Allowed. Please enter valid password"
    // }
    // else if (signupData.AccountID.trim().length == 0) {
    //   this.validationErrorAccountId = 0;
    //   this.validationAccError = 1
    //   this.errorMessageAccountId = "Empty String Not Allowed. Please enter valid password"
    // }
    // else {
    //   if (this._checkSavePassword == 1) {
    //     this.validationPassBlank = 1;
    //     this.errorMessageBlankPass = "Please remove space first";
    //   }
    //   else if (this._checkSaveAccId == 1) {
    //     this.validationErrorAccountId = 1;
    //     this.errorMessageAccId = "Please remove space first";
    //   }
    //else {
      if (this.registerForm.value.Password) {
        let e = Md5.hashStr(this.registerForm.value.Password)
        signupData.Password = this.registerForm.value.Password
        signupData.EncryptPassword = e
      }
    signupData.IsMobile = 0
    this._registerService.registerUser(signupData).subscribe(resp => {
      if (resp.Header.Success == false) {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
        return this.msgs;
      }
      else {
        if (signupData.LinkedAccountUId) {
          this.successMessage = "You have successfully registered";
        }
        this.showSuccess = true;
      }
    })
    //}
    //}
    
  }
  okay() { this.showSuccess = false; this._router.navigate(['/login']); }

  // New SignUp implementation
  SingleSignOn(provider) {
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
      (data: any) => {
        let socialData = data;
        this.registerForm.patchValue({
          FirstName: socialData.name,
          PrimaryEmailId: socialData.email,
          LinkedAccountUId: socialData.uid,
          LinkedAccountProvider: socialData.provider
        })
      //  this.msgs = [{ severity: 'success', summary: 'Success', detail: 'Link account id is added successfully' }];
        this.registerForm.get('LastName').clearValidators();
        this.registerForm.get('ConfirmPassword').clearValidators();
        this.registerForm.get('Password').clearValidators();
        this.registerForm.get('Password').updateValueAndValidity();
        this.registerForm.get('LastName').updateValueAndValidity();
        this.registerForm.get('ConfirmPassword').updateValueAndValidity();
        this.isReadOnly = true;
      }
    )
  }
confirmPass:any;
confirmPassError:any
  checkConfirmPass(){
    if(this.registerForm.get(['Password']).value != this.registerForm.get(['ConfirmPassword']).value){
      this.confirmPass=1
      this.confirmPassError='Password and confirm password is not matching'
      // this.registerForm.disabled === true
    }
    else{
      this.confirmPass=0
      this.confirmPassError=''
     
    }
    
  }
}
