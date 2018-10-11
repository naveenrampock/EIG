import { Component, OnInit, OnChanges } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  selector: 'app-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.css']

})

export class UserNotificationComponent {

  notificationsForm: FormGroup;
  uID = Cookie.get('userID');
  private email = Cookie.get('email');
  private accountID = Cookie.get('accountID')
  msgs: Message[] = [];
  private old = {};
  private new = {};
  private id;
  private usersUserId = Cookie.get('userID');
  profileDetails: any;
  notifyData: any

  constructor(private _FB: FormBuilder,
    private _userService: UserSettingsService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit() {
    this.getUserDetails();
    this.notificationSettings()
  }

  getUserDetails() {

    this._userService.getUserProfileDetailsById(this.uID).subscribe((resp) => {

      this.old = resp.Body.Data;
      resp = resp.Body.Data;
      this.profileDetails = resp;
      this.notifyData = this.profileDetails;
      this.notificationsForm.patchValue({
        NotifyByEmail: this.notifyData.NotifyByEmail ? this.notifyData.NotifyByEmail : 0,
        NotifyBlogUpdates: this.notifyData.NotifyBlogUpdates ? this.notifyData.NotifyBlogUpdates : 0,
        NotifyLatestUpdates: this.notifyData.NotifyLatestUpdates ? this.notifyData.NotifyLatestUpdates : 0,
        NotifyUserMessages: this.notifyData.NotifyUserMessages ? this.notifyData.NotifyUserMessages : 0,
        ReceiveMonthlyNewsletter: this.notifyData.ReceiveMonthlyNewsletter ? this.notifyData.ReceiveMonthlyNewsletter : 0
      })
    })

  }

  notificationSettings() {
    // let notifyData = this.profileDetails;
    this.notificationsForm = this._FB.group({
      NotifyByEmail: [''],
      NotifyBlogUpdates: [''],
      NotifyLatestUpdates: [''],
      NotifyUserMessages: [''],
      ReceiveMonthlyNewsletter: ['']
    })
    this.old = this.notificationsForm.value
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
    nData.userGuID = this.uID
    this.new = nData;
    let notificationData = { new: this.new, old: this.old }
    this._userService.saveNotification(notificationData, this.uID).subscribe((res) => {
      if (res) {
        this.showSuccess(res.message);
        this.getUserDetails()
      }
    })
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: 'User notification is updated successfully' });
  }
}