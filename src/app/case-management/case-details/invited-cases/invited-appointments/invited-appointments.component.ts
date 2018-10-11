import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CaseManagementService } from '../../../case-management.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';
declare var window: any, VC: any, $: any;
@Component({
  selector: 'app-invited-appointments',
  templateUrl: './invited-appointments.component.html',
  styleUrls: ['./invited-appointments.component.css']
})
export class InvitedAppointmentsComponent implements OnInit {
  minSDate: Date = new Date(Date.now());
  isShowApptDetails: boolean;
  appointmentDetails: any;
  appointments: any;
  msgs: any[];
  isCreateApp: boolean;
  invitedAppointmentDetails: any;
  isInvVidyoOpen: boolean;
  vidyoConnector: any;
  @Output() closeInApptView: EventEmitter<any> = new EventEmitter();
  userId = Cookie.get('Id');
  guId = Cookie.get('userID');
  iAppointments: any;
  @Input() invitedCaseDetails: any;
  @Output() closeApptView: EventEmitter<any> = new EventEmitter();
  @Input() appointmentCount: EventEmitter<any> = new EventEmitter();
  newAppointment: { startTime: Date, endTime: Date, discussionName: string, appStartDate: Date, appError: string } = {
    startTime: null, endTime: null, discussionName: '', appStartDate: null, appError: '',
  }

  constructor(private caseManagementService: CaseManagementService) {
  }

  ngOnInit() {
    this.getAppointmentsBy(this.invitedCaseDetails);
    console.log(this.invitedCaseDetails);
  }
  selectStartDate() {
    this.minSDate = new Date(Date.now());
  }

  createAppointment() {
    // adApt.caseId, adApt.appointmentTitle, adApt.appointmentDate, adApt.appointmentStartTime, adApt.appointmentEndTime, adApt.uId

    let startTime = new DatePipe('en');
    let startTimeFmt = startTime.transform(this.newAppointment.startTime, "HH:mm:ss");
    let endTime = new DatePipe('en');
    let endTimeFmt = endTime.transform(this.newAppointment.endTime, "HH:mm:ss");
    let appDate = new DatePipe('en')
    let appDateFmt = appDate.transform(this.newAppointment.appStartDate, 'yyyy-MM-dd');

    if (this.newAppointment.discussionName == '' || this.newAppointment.startTime == null || this.newAppointment.endTime == null || this.newAppointment.appStartDate == null) {
      console.log(this.newAppointment);
      this.newAppointment.appError = 'All fields are mandatory. Please enter valid details';
      setTimeout(() => {
        this.newAppointment.appError = '';
      }, 4000)
    } else if (startTimeFmt > endTimeFmt) {
      this.newAppointment.appError = 'Start time cannot be more than end time';
      setTimeout(() => {
        this.newAppointment.appError = '';
      }, 4000)
    }
    else if (startTimeFmt == endTimeFmt) {
      this.newAppointment.appError = 'Start time and end time cannot be same.';
      setTimeout(() => {
        this.newAppointment.appError = '';
      }, 4000)
    }
    else {
      let inv = this.invitedCaseDetails.InviteeId;
      this.invitedCaseDetails.InviteeId.map(i => {
        if (i == this.userId) {
          inv.splice(inv.indexOf(i), 1);
        }
      })
      // inv.push(this.invitedCaseDetails.CaseCreatedBy);
      let appData = { caseId: this.invitedCaseDetails.Id, appointmentTitle: this.newAppointment.discussionName, appointmentStartTime: startTimeFmt, appointmentEndTime: endTimeFmt, appointmentDate: appDateFmt, userID: this.userId, inviteeId: inv, appointmentStatus: 0 }

      this.caseManagementService.getUserConfigurationById(this.guId).subscribe(res => {
        var vidyoVal = res.Body.Data;
        console.log(res.Body.Data);
        if (vidyoVal.HasVideoconference == 1) {
          let s: any = new Date(this.newAppointment.startTime);
          let e: any = new Date(this.newAppointment.endTime);
          var timeDiff = Math.floor(Math.abs(s - e) / 1000 / 60);
          if (vidyoVal.Maxconferencelength > timeDiff) {
            this.caseManagementService.addAppointment(appData).subscribe(res => {
              if (res.Header.Success) {
                this.showSuccess(res.Body.Message);
                this.isCreateApp = false;
                let appointmentId = res.Body.Data.appointmentId;
                this.iAppointments.push({ AppointmentDate: appData.appointmentDate, AppointmentTitle: appData.appointmentTitle, EndTime: appData.appointmentEndTime, StartTime: appData.appointmentStartTime, Id: appointmentId, status: appData.appointmentStatus, AppointmentCreatedBy: this.invitedCaseDetails.CaseCreatedBy });
                this.invitedCaseDetails.AppointmentCount += 1;
                this.appointmentCount.emit(this.invitedCaseDetails);
                // let param: any = { 'caseId': this.invitedCaseDetails.Id, 'userId': this.userId, 'invitee': 'invitedApps' };
                this.getAppointmentsBy(this.invitedCaseDetails);
              } else {
                // this.showError(res.Body.Message);
                this.newAppointment.appError = res.Body.Message;
                setTimeout(() => {
                  this.newAppointment.appError = '';
                }, 5000)
              }
            })
          } else {
            this.newAppointment.appError = 'Video Conference duration should be less than or equal to  ' + vidyoVal.Maxconferencelength + ' mins for your account.';
            setTimeout(() => {
              this.newAppointment.appError = '';
            }, 5000)
          }
        } else {
          this.newAppointment.appError = 'Video Conference is not enabled for your account.';
          setTimeout(() => {
            this.newAppointment.appError = '';
          }, 5000)
        }
      });

    }
  }

  getAppointmentsBy(invitedCase) {
    let param: any = { 'caseId': invitedCase.Id, 'userID': this.userId, 'invitee': 'invitedApps' };
    // this.caseManagementService.getInvitedAppointmentsBy(param).subscribe(res => {
    this.caseManagementService.getAppointmentsBy(param).subscribe(res => {
      this.iAppointments = res.Body.Data.Items;
    })
  }

  createNewAppointment() {
    this.isCreateApp = true;

  }
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: msg });
  }
  rejectAppointment(appointment) {
    console.log(appointment);
    let rejParams = { invitedId: appointment.InviteeId, appointmentId: appointment.AppointmentId }
    this.caseManagementService.rejectAppointment(rejParams).subscribe(res => {
      if (res.Header.Success) {
        console.log(res.Body.Message);
      }
    },
      error => console.error(error),
      () => {
        this.invitedCaseDetails;
        console.log('completed')
      }
    )
  }
  acceptAppointment(appointment) {
    let accParams = { invitedId: appointment.InviteeId, appointmentId: appointment.AppointmentId }
    this.caseManagementService.acceptAppointment(accParams).subscribe(result => {
      if (result.Header.Success) {
      }
    },
      error => {
        console.log(error)
      },
      () => {
        this.iAppointments.map((ap) => {
          if (ap.AppointmentId = appointment.AppointmentId) {
            ap.InviteeConfirmationstatus = 1;
          }
        });
        console.log(this.iAppointments);
      }
    )
  }
  cancelApp() {
    this.isCreateApp = false;
    // this.newAppointment = 
  }
  closeAppoint() {
    this.closeInApptView.emit(this.invitedCaseDetails);
  }

  joinVidyoCall(appointment) {
    this.isInvVidyoOpen = true;
    setTimeout(() => {
      $('#VidyoConference').modal('show');
    }, 500);
    this.invitedAppointmentDetails = appointment;
  }


  closeVidyo() {
    this.isInvVidyoOpen = false;
    console.log(this.isInvVidyoOpen)
  }

  deleteAppointment(appointment) {
    console.log(appointment);
    let params = { 'userID': appointment.AppointmentCreatedBy, 'appointmentId': appointment.AppointmentId }
    this.caseManagementService.deleteAppointments(params).subscribe(res => {
      console.log(res);
      this.showSuccess(res.Body.Message);
      if (res.Header.Success) {
        console.log(this.appointments)
        this.iAppointments.splice(this.iAppointments.indexOf(appointment), 1);
        this.invitedCaseDetails.AppointmentCount -= 1;
        this.appointmentCount.emit(this.invitedCaseDetails);
      }
    })
  }

  viewApptDetails(id) {
    let apptId = { 'appointmentId': id };
    this.caseManagementService.viewAppointmentDetailsBy(apptId).subscribe(
      res => {
        this.appointmentDetails = res.Body.Data.Items;
      },
      err => console.error(err),
      () => {
        this.isShowApptDetails = true;
        console.log('completed')
      }
    )
  }
  closeViewApptDetails() {
    this.isShowApptDetails = false;
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

}
