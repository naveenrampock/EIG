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
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  display: boolean = false;
  userDisplay: boolean = false;
  profilerDisplay: boolean = false;
  userList: Array<any> = [];
  email: any;
  profileForm: FormGroup;
  msgs: any;
  id: any;
  statusId: any;
  // test: any;
  private uid: any;
  private loginUid = Cookie.get('userID');
  private adminsAccId = Cookie.get('accountID');
  private usersUserId: any;
  private adminsUserId = Cookie.get('userID');
  pageNumber: any = 1
  maxItemPerPage: number = 10;
  userType: number = 3
  searchData: any;
  userName: any;
  list: any;
  lazyList: Array<any> = [];
  totalRecords: number
  public firstName = Cookie.get('firstName')
  public lastName = Cookie.get('lastName')

  constructor(private _adminService: AdminService, private router: Router, private _FB: FormBuilder,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {

    // this.getUsers();
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
      UserType: ['3'],
      Gender: [''],
      MiddleName: ['', ValidationService.alphabetsValidation],
      Suffix: [''],
      Password: ['', Validators.compose([Validators.required, ValidationService.passwordValidator])],
    })
  }
  getUsers() {
    // this._adminService.getUserList("3")
    //   .subscribe((data) => {
    //     this.userList = data;
    //     console.log(this.userList,"this.userList");
    //   })

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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  saveProfileTab() {
    let e = Md5.hashStr(this.profileForm.value.Password);
    let pData = this.profileForm.value;
    pData.LinkedAccount = pData.FirstName;
    pData.IsMobile = 0;
    pData.EncryptPassword = e
    this._adminService.registerUser(pData).subscribe((res) => {
      if (res.Header.Success == false) {
        this.msgs = [{ severity: 'error', summary: 'Error Message', detail: res.Header.Message }];
        this.display = true;
      }
      else {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: "User Created  Succesfully" }];
        this.display = false;
        this.userList.push(pData);
        this.loadCarsLazy({ first: 0, rows: 10 });
        this.profileSettingsForm();

      }
    })
    // this.ngOnInit();
  }
  showDialog() {
    this.display = true;

  }
  showUser() {
    this.userDisplay = true;
    this.email = '';
  }

  close() {
    this.display = false;
    this.profileSettingsForm();
  }

  cancel() {
    this.userDisplay = false;
    this.email = '';
  }
  editProfile(id) {
    // this.profilerDisplay=true;
    this.router.navigate(['/admin/profile', id]);
  }

  confirmDeleteDeactivate(guid, accStatus, userName) {
    this.id = guid
    let uID = { 'id': this.id }
    this.usersUserId = guid;

    this.uid = guid;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        if (accStatus == 1) {
          this._adminService.adminDeleleAcc(this.uid, this.loginUid)
            .subscribe((data) => {

              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: ' Account Deleted  Succesfully' }];
              for (let i = 0; i < this.userList.length; i++) {
                if (this.userList[i].UserIdentifier == this.uid) {
                  this.userList[i].StatusId = 3
                }
              }
            })
        }
        else {
          let data = { adminsUserId: this.adminsUserId, adminsAccId: this.adminsAccId, usersUserId: this.usersUserId }
          this._adminService.deactivateUser(data)
            .subscribe((data) => {

              this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: ' Account Deactivated  Succesfully' }];

              for (let i = 0; i < this.userList.length; i++) {
                if (this.userList[i].UserIdentifier == this.uid) {
                  this.userList[i].StatusId = 2
                }
              }
              // this.ngOnInit()

            })
        }
        // this.msg= [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
      },
      reject: () => {

        // this.msg = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  // showSuccess(msg) {
  //   this.msgs = [];
  //   this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  // }

  // showError(msg){
  //   this.msgs = [];
  //   this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  // }

  sendEmailInvite(email) {
    let data = { 'email': email, UserId: Cookie.get('userID') }
    this._adminService.sendEmailInvite(data)
      .subscribe((data) => {


        let resp = data.Body.Data;
        if (resp) {
          if (resp == "The Email_Id you provided is already a part of medicamind application") {
            // this.showLogout("Token is expired. Please login again");
            //  this.showError("The Email_Id you provided is already a part of medicamind application")
            this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'The Email_Id you provided is already a part of medicamind application' }];

          } else {
            this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Email Sent Succesfully' }];
            this.email = '';
            this.userDisplay = false;
          }
        }
      })
  }

  private confirmActivate(id) {
    //  let data = {userIdentifier:id}
    let data = { adminsUserId: this.adminsUserId, adminsAccId: this.adminsAccId, usersUserId: id }

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {

        this._adminService.activateUser(data)
          .subscribe((data) => {
            for (let i = 0; i < this.userList.length; i++) {
              if (this.userList[i].UserIdentifier == id) {
                this.userList[i].StatusId = 1
              }
            }
            this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: ' Account Activated Succesfully' }];



          })

        // this.msg= [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
      },
      reject: () => {

        // this.msg = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
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

  searchUser(e) {
    // this.lazyList = [];

    if (this.userName == "") {
      this.list = null;
      this.userList = [];
    } else {
      this.userList = [];

      this._adminService.getUserListByKey(this.userType, this.userName)
        .subscribe((data) => {
          // this.list = data.Body.Data;
          this.userList = data.Body.Data;
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
