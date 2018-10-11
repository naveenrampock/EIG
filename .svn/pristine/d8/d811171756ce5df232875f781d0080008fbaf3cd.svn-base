import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-email-notifications',
  templateUrl: './email-notifications.component.html',
  styleUrls: ['./email-notifications.component.css']
})
export class EmailNotificationsComponent implements OnInit {
  emailNotifyLists;
  constructor(private _adminService: AdminService) {

  }

  ngOnInit() {
    this.getEmailLists();
  }

  getEmailLists() {
    this._adminService.getEmailLists().subscribe((resp) => {
      this.emailNotifyLists = resp;
    })
  }
  resend(data) {
    console.log(data)
    data.NotificationDate = null;
    this._adminService.resendEmail(data).subscribe((resp) => {
      this.emailNotifyLists = resp;
    })
  }

}
