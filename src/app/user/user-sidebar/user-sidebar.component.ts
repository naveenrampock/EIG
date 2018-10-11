import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CONFIG } from '../../core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  msgs: any;
  inviteEmail: { emailId: string, valid: boolean, errorMsg: string } = { emailId: '', valid: false, errorMsg: '' };
  uID = Cookie.get('userID');
  profilePic = Cookie.get('profilePic');
  isShowInvite: boolean = false;
  // patientId = Cookie.get('PatientId');
  Id = Cookie.get('Id');
  
  constructor(private _userService: UserService,private router: Router) { }

  ngOnInit() {
    this.profilePic = Cookie.get('profilePic');
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }

  public imageEvent(event) {
    const fileSelected: File = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.profilePic = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
    this._userService.uploadFile(fileSelected, this.uID)
      .subscribe((response) => {
        if (response.success) {
          this.showSuccess(response.message);
          Cookie.set('profilePic', CONFIG.url + response.profilepath);
        }
      })
  }

  validateUpload(event) {
    var _validFileExtensions = ["image/jpeg", "image/png", "image/jpg"];
    let ext = event.target.files[0].type;
    let imgSize = event.target.files[0].size;
    if ((_validFileExtensions.indexOf(ext) == -1) || imgSize > '5000000') {
      this.showError('Invalid file(Max size 500kb and allowed file types are jpeg, png');
    } else {
      this.imageEvent(event)
    }
  }
  inviteScreen() {
    this.isShowInvite = true;
  }
  settings() {
    this.isShowInvite = false;
    this.inviteEmail.emailId = '';
    this.inviteEmail.errorMsg = '';
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  savePatientId() {
    this.router.navigate(['/user/patient-info/', Cookie.get('PatientId')])
  }
  sendInvitation(email: any) {
    this.inviteEmail.valid = this.validateEmail(email);
    if (!this.inviteEmail.valid) {
      this.inviteEmail.errorMsg = 'Please enter valid Email Id';
    }
    else {
      let data = { email: email, userID: Cookie.get('userID') };
      this._userService.sendInvatation(data).subscribe(res => {
        if (res) {
          this.showSuccess("Invitation has been sent successfully.");
          this.isShowInvite = false;
          this.inviteEmail.emailId = '';
          this.inviteEmail.errorMsg = '';
        }
      })
    }
  }
}
