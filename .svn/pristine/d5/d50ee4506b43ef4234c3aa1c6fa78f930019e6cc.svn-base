import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs/operator/last';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserProfileService } from '../user-profile.service';
import { CONFIG } from './../../core/config/config';
import { Subscription } from 'rxjs/Rx';
import { AuthService } from "angular2-social-login";
import { RefreshService } from './../../core/dataservice/refresh.service'
import { ValidationService } from '../../core/validation/validation.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
  // styleUrls: ['./log.component.css'],
  // providers: [LogService]
})

export class UserInfoComponent {
  private sub: Subscription;
  public profileForm: FormGroup;
  uID = Cookie.get('userID');
  private accountID = Cookie.get('accountID')
  private old = {};
  private new = {};
  profileDetails: any;
  isEdit: boolean = false;
  imgUrl: any;
  image: any;
  private imageData = {};
  private local: any = CONFIG.url;
  public count: any = 0;
  linkedAccounts: any;
  msgs = [];
  checkImage: any;
  isMedia: boolean = false;
  isFacebook: boolean = false;
  isGoogle: boolean = false;
  facebookEmail: any;
  googleEmail: any;
  isLinkedExistingAccountPopup: boolean = false;
  providerName: any = '';
  facebookButton: boolean = false;
  googleButton: boolean = false;
  checkUpload: any;
  isTokenExpired:boolean = false;

  constructor(private _FB: FormBuilder, public _auth: AuthService,
    private _userService: UserProfileService, private refresh: RefreshService, private translate: TranslateService,private router: Router
  ) { }

  ngOnInit() {
    this.checkUpload = 0;
    this.getUserProfileLinkedAccount();
    this.profileSettingsForm();
  }

  editProfile() {
    this.isEdit = true;
  }
  cancel() {
    this.isEdit = false;
    this.getUserDetails()
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  profileSettingsForm() {
    this.profileForm = this._FB.group({
      FirstName: ['', Validators.compose([Validators.required, ValidationService.alphabetsValidation])],
      LastName: ['', Validators.compose([Validators.required, ValidationService.alphabetsValidation])],
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
    });
    this.getUserDetails();
  }

  saveProfileTab() {
    if (this.count > 0) {
      this.saveImage(this.imageData)

    }
    let pData = this.profileForm.value;
    pData.UpdateTab = 'Profile';
    pData.applicationAction = 'Update User Profile'
    pData.createdFor = null
    pData.userIdentifier = this.uID
    pData.loginId = this.uID
    pData.image = this.image

    this.new = pData;

    let profileData = { new: this.new, old: this.old }
    this._userService.saveSettings(profileData, this.uID).subscribe((res) => {
      if (res) {
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: 'Success', detail: 'User profile updated successfully' });
        this.getUserDetails();
      }
    })
  }

  getUserDetails() {
    this._userService.getUserProfileDetailsById(this.uID).subscribe((resp) => {
      if (resp.Header.Success == false) {
        if (resp.Header.Status === 403) {
          Cookie.set('isUserDeviceValid', 'false',999999999);
          this.isTokenExpired = true;
        }
        else {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
          return this.msgs;
        }
      }
      else {
        this.old = resp.Body.Data;
        resp = resp.Body.Data;
        this.profileDetails = resp;
        // this.imgUrl = this.local.concat(resp.imagepath);
        if (this.checkUpload == 1) {
          this.refresh.changeMessage(this.local.concat(resp.imagepath))
        }
        this.refresh.currentMessage.subscribe(message => this.imgUrl = message)
        // this.refresh.setTestFunction(this.local.concat(resp.imagepath))
        // this.imgUrl = this.refresh.getTestFunction()
        Cookie.delete('profilePic');
        Cookie.set('profilePic', this.local.concat(resp.imagepath))
        if (resp.imagepath == null || resp.imagepath == "") {
          this.checkImage = 1;
        } else {
          this.checkImage = 0;
        }
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
      }
    })
  }

  setImage: any

  public imageEvent(event) {
    this.count++;
    this.imageData = event;
    const fileSelected: File = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this.image = fileSelected.name
    this.setImage = this.local.concat(this.image)
    // this.refresh.setTestFunction(this.setImage)
    this.checkImage = 0
  }

  saveImage(event) {
    this.checkUpload = 1
    const fileSelected: File = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgUrl = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this._userService.uploadFile(fileSelected, this.uID)
      .subscribe((response) => {
        if (response.success) {
          // this.showSuccess(response.message);
        }
      })
  }

  validateUpload(event) {
    var _validFileExtensions = ["image/jpeg", "image/png", "image/jpg"];
    let ext = event.target.files[0].type;
    let imgSize = event.target.files[0].size;
    this.imageEvent(event)
  }

  socialMediaPopup() {
    this.isMedia = true;
  }

  getUserProfileLinkedAccount() {
    this._userService.getUserProfileLinkedAccount(this.uID).subscribe((resp) => {
      let data = resp.Body.Data;
      if (data) {
        data.forEach(x => {
          switch (x.Provider) {
            case "facebook":
              this.isFacebook = true;
              this.facebookButton = true;
              this.facebookEmail = x.Email;
              break;
            case "google":
              this.isGoogle = true;
              this.googleButton = true;
              this.googleEmail = x.Email;
              break;
            default:
              this.isFacebook = false;
              this.isGoogle = false;
              this.facebookEmail = "";
              this.googleEmail = "";
              break;
          }
        });
      }
      else {
        this.isFacebook = false;
        this.isGoogle = false;
        this.facebookEmail = "";
        this.googleEmail = "";
      }
    })
  }

  linkedExistingAccount() {
    if (this.providerName === 'facebook') {
      this.singleSignOn('facebook', 1);
    }
    if (this.providerName === 'google') {
      this.singleSignOn('google', 1);
    }
    this.isLinkedExistingAccountPopup = false;
  }

  cancelLinkedExistingAccountPopup() {
    this.isLinkedExistingAccountPopup = false;
  }

  singleSignOn(provider, isLinkedExistingAccount) {
    this.sub = this._auth.login(provider).subscribe(
      (data: any) => {
        let socialData = data;
        let param = {
          linkedUId: socialData.uid,
          linkedProvider: socialData.provider,
          linkedEmail: socialData.email,
          userIdentifier: this.uID,
          linkedName: socialData.name,
          isLinkedExistingAccount: isLinkedExistingAccount ? isLinkedExistingAccount : 0
        }
        this.isMedia = false;

        this._userService.addUserProfileLinkedAccount(param).subscribe(resp => {
          if (resp.Header.Success == false) {
            if (resp.Header.Code === 422) {
              this.isLinkedExistingAccountPopup = true;
              this.providerName = socialData.provider;
            }
            else {
              this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
              return this.msgs;
            }
          }
          else {
            this.getUserProfileLinkedAccount();
            this.msgs = [{ severity: 'success', summary: 'Success Message', detail: "Account added successfully" }];
            return this.msgs;
          }
        });
      });
  }

  deleteUserProfileLinkedAccount(provider: any, linkedEmail: any) {
    let param = {
      linkedEmail: linkedEmail,
      uId: this.uID
    }

    this._userService.deleteUserProfileLinkedAccount(param).subscribe(resp => {
      if (resp.Header.Success == false) {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: resp.Header.Message }];
        return this.msgs;
      }
      else {
        switch (provider) {
          case "facebook":
            this.isFacebook = false;
            this.facebookButton = false;
            break;
          case "google":
            this.isGoogle = false;
            this.googleButton = false;
            break;
          default:
            this.isFacebook = false;
            this.isGoogle = false;
            this.facebookEmail = "";
            this.googleEmail = "";
            break;
        }
        this.msgs = [{ severity: 'success', summary: 'Success Message', detail: 'Account deleted successfully' }];
        return this.msgs;
      }
    });
  }


}