import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/primeng';
import { Md5 } from 'ts-md5/dist/md5';
import { ValidationService } from '../../core/validation/validation.service';


@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.css']
})
export class AdminManagementComponent implements OnInit {
  display: boolean = false;
  displayAdmin: boolean = false;
  userList: Array<any> = [];
  uID = Cookie.get('userID');
  id: any;
  email: any;
  profileForm: FormGroup;
  msgs: any;
  private uid: any;
  private loginUid = Cookie.get('userID');
  private adminsAccId = Cookie.get('accountID');
  private usersUserId: any;
  private adminsUserId = Cookie.get('userID');
  userType: number = 2
  maxItemPerPage: number = 10;
  pageNumber: number = 1;
  searchData: any;
  userName: any;
  list: any;
  lazyList: any;
  totalRecords: number;
  public firstName = Cookie.get('firstName')
  public lastName = Cookie.get('lastName')

  constructor(private _adminService: AdminService, private router: Router, private _FB: FormBuilder,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    // this.getAdminList();
    this.profileSettingsForm();
  }

  close() {
    this.display = false;
    this.profileSettingsForm();
  }

  profileSettingsForm() {
    this.profileForm = this._FB.group({
      FirstName: ['', Validators.compose([Validators.required, ValidationService.alphabetsValidation])],
      LastName: ['', Validators.compose([Validators.required, ValidationService.alphabetsValidation])],
      AccountID: ['', Validators.required],
      CompanyName: [''],
      Position: [''],
      PrimaryEmailId: ['', Validators.compose([Validators.required, ValidationService.emailValidator])],
      linkedaccount: [null],
      LinkedAccountType: [0],
      Website: [''],
      PhoneNumber: [''],
      OfficePhoneNumber: [''],
      Address1: [''],
      Address2: [''],
      City: [''],
      State: [''],
      Zipcode: [''],
      UserType: ['2'],
      Gender: [''],
      MiddleName: ['', ValidationService.alphabetsValidation],
      Suffix: [''],
      Password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
    })
  }
  showDialog() {
    this.display = true;
  }
  showAdmin() {
    this.displayAdmin = true;
  }
  showUser() {
    this.displayAdmin = true;
    this.email = '';
  }
  getAdminList() {

    this._adminService.getUserList(this.userType, this.maxItemPerPage, this.pageNumber)
      .subscribe((data) => {
        this.userList = data.Body.Data
        this.totalRecords = data.totalCount

      })
  }

  loadCarsLazy(event) {
    setTimeout(() => {
      if (this.userList) {
        this.lazyList = this.userList.slice(event.first, (event.first + event.rows));

      }
    }, 1000);
  }

  test() {
    let myImg = document.querySelector('#tester_li');

    let observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // if(data == true){
        if (entry.intersectionRatio > 0) {
          console.log('in the view');
          this.pageNumber = this.pageNumber + 1;
          this._adminService.getUserList(this.userType, this.maxItemPerPage, this.pageNumber)
            .subscribe((data) => {
              let list = data
              this.userList = this.userList.concat(list);
            })
        }
        // }
        // else{
        //   observer.unobserve(entry.target);
        // }
      });
    });

    observer.observe(myImg);

    //IMP NOTE - CALL BELOW LINE AFTER CLOSING POPUP
    //observer.unobserve(entry.target);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  saveProfileTab() {
    let e = Md5.hashStr(this.profileForm.value.Password)
    let pData = this.profileForm.value;
    pData.LinkedAccount = pData.FirstName;
    pData.IsMobile = 0;
    pData.EncryptPassword = e
    this._adminService.registerUser(pData).subscribe((res) => {
      if (res.Header.Success == false) {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: res.Header.Message }];
      }
      else {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: "Admin Created  Succesfully" }];
      }
    })
    this.display = false;
    // this.ngOnInit();
  }

  editProfile(id) {
    // this.profilerDisplay=true;
    this.router.navigate(['/admin/profile', id]);
  }

  confirmDeleteDeactivate(guid, accStatus) {
    this.id = guid
    let uID = { 'id': this.id }
    let data = { id: guid }
    this.usersUserId = guid;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        if (accStatus == 1) {
          this._adminService.adminDeleleAcc(guid, guid)
            .subscribe((data) => {
              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Admin Account Deleted Successfully' }];


              for (let i = 0; i < this.userList.length; i++) {
                if (this.userList[i].UserIdentifier == guid) {
                  this.userList[i].StatusId = 3
                }
              }


            })
        }
        else {
          let data = { adminsUserId: this.adminsUserId, adminsAccId: this.adminsAccId, usersUserId: this.usersUserId }

          this._adminService.adminDeactivateAcc(data)
            .subscribe((data) => {

              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Admin Account Deactivated Succesfully' }];

              for (let i = 0; i < this.userList.length; i++) {
                if (this.userList[i].UserIdentifier == guid) {
                  this.userList[i].StatusId = 2
                }
              }

            })
        }
        // this.msg= [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
      },
      reject: () => {

        // this.msg = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  sendEmailInvite(email) {
    let data = { 'email': email }
    this._adminService.sendEmailInvite(data)
      .subscribe((data) => {
        console.log(data);
        this.displayAdmin = false;
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Email Sent Succesfully' }];
      })
  }

  private confirmActivate(id) {
    let data = { adminsUserId: this.adminsUserId, adminsAccId: this.adminsAccId, usersUserId: id }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {

        this._adminService.activateUser(data)
          .subscribe((data) => {
            this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Admin Account Deactivated  Succesfully' }];

            for (let i = 0; i < this.userList.length; i++) {
              if (this.userList[i].UserIdentifier == id) {
                this.userList[i].StatusId = 1
              }
            }

            // this.ngOnInit()

          })

        // this.msg= [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
      },
      reject: () => {

        // this.msg = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  searchUser(e) {
    if (this.userName == "") {
      this.list = null;
      this.userList = [];

    } else {
      this.userList = [];
      this._adminService.getUserListByKey(this.userType, this.userName)
        .subscribe((data) => {
          // this.list = data.Body.Data;
          this.userList = data.Body.Data
          this.totalRecords = data.Body.Data.length;
        })
    }
  }

  private unlockAccount(guid) {
    let data = { 'uid': guid, 'loginUid': this.loginUid }
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this._adminService.unlockAccount(data)
          .subscribe((response) => {
            if (response.Header.Success == true) {
              for (let i = 0; i < this.userList.length; i++) {
                if (this.userList[i].UserIdentifier == guid) {
                  this.userList[i].IsLockedOut = 0;
                }
              }
              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: response.Body.Data }];
            } else {
              this.msgs = [{ severity: 'error', summary: 'Error Message', detail: response.Header.Message }];
            }
          })
      },
      reject: () => {
        // this.msg = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

}
