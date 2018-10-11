import { Component, OnInit, OnChanges } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserSettingsService } from '../user-settings.service';
import { Router, NavigationEnd } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Subject } from 'rxjs/Subject';
import { ValidationService } from '../../core/validation/validation.service';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { CONFIG } from '../../core';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
    selector: 'app-user-security',
    templateUrl: './user-security.component.html',
    styleUrls: ['./user-security.component.css']
   // styleUrls: ['./log.component.css'],
   // providers: [LogService]
  })

  export class UserSecurityComponent{

    public privacyForm: FormGroup;
    public uID = Cookie.get('userID');
    private email = Cookie.get('email');
    private accountID = Cookie.get('accountID')
    isRequiredToken:boolean = true
    validationError: any;
    prvcyData:any;
    isConfirmEmailOtp: boolean = false;
    isSmsOtp: boolean = false;
    deactivate: boolean = false;
    deleteAccount: boolean = false;
    msgs: Message[] = [];
    private old = {};
    private new = {};
    private id;
    private usersUserId = Cookie.get('userID');
    profileDetails: any;

    constructor(private _FB: FormBuilder,
                private _userService: UserSettingsService,
                private router: Router,
                private confirmationService: ConfirmationService
                ) { }
    
        ngOnInit(){
            this.getUserDetails();
            this.privacySettingsForm();
          }

          getUserDetails() {
            
               this._userService.getUserProfileDetailsById(this.uID).subscribe((resp) => {
                 
                this.old = resp.Body.Data;
                 resp = resp.Body.Data;
                 this.profileDetails = resp;
                 this.prvcyData = this.profileDetails;
               })
               
             }

          privacySettingsForm() {
           
            this.privacyForm = this._FB.group({
              CurrentPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
              NewPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
              ConfirmPassword: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
              LoginVerification: [''],
              ResetPassword: [''],
              SavePassword: [''],
            }, { validator: [ValidationService.matchingPasswords, ValidationService.matchingOldPasswords] })
            this.old =  this.privacyForm.value
          }

          saveSecuritySettings() {
            let secData = this.privacyForm.value;
            let data = this.privacyForm.value;
            let password = secData.NewPassword
             data.userGuID = this.uID
            // data.accountId = 'sumedh'
            data.currentPassord = Md5.hashStr(secData.CurrentPassword)
            data.newPassword = Md5.hashStr(secData.NewPassword)
            data.password = password
            data.email = this.email
            data.accountId = this.accountID
            data.isAdmin = 0
            let securitySettings = data;
           this._userService.saveSecuritySettings(securitySettings, this.uID).subscribe((res) => {
              if (res.code == 1) {
                this.validationError = 'Current Password does not match. Please provide valid password';
              } else {
                  if(res.Header.Success == false){
                    this.showFailure(res.Body.Data);
                  }
                  else{
                this.showSuccess(res.message);
               this.ngOnInit();
                  }
              }
            })
          }

          showFailure(msg){
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Current password is wrong. Please enter valid password' });
          }

          showSuccess(msg) {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: 'Success', detail: 'User security settings updated successfully' });
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
        
                this._userService.userDeleleAcc(this.uID,this.uID)
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

          navigateLogin() {
            Cookie.delete('token');
            Cookie.delete('userType');
            Cookie.delete('userID');
            this.router.navigate(['/login']);
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

  }