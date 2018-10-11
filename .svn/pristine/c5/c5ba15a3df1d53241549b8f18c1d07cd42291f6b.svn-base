import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CaseManagementService } from '../../../case-management.service';
import { DatePipe } from '@angular/common';
// import { SocketService } from '../../../socket.service';
import { CaseManagementUtilService } from '../../../case-management-util.service';
import { Subscription } from 'rxjs/Subscription';

import { Cookie } from 'ng2-cookies/ng2-cookies';
import { VideorendererComponent } from '../../../shared/videorenderer/videorenderer.component';




declare var $;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  @ViewChild(VideorendererComponent)
  private vidyoComponent: VideorendererComponent;
  isVidyoOpen: boolean;
  vidyoAppoint: any;
  loadAPI: Promise<{}>;
  vidyoConnector: any;
  isShowApptDetails: boolean = false;
  appointmentDetails: any;
  msgs: any[];
  appointments: Array<any> = [];
  minSDate: Date = new Date(Date.now());
  isCreateApp: boolean = false;
  @Input() caseDetails: any;
  @Output() closeApptView: EventEmitter<any> = new EventEmitter();
  @Input() appointmentCount: EventEmitter<any> = new EventEmitter();
  @Input() contactsLists: any;
  newAppointment: { startTime: Date, endTime: Date, discussionName: string, appStartDate: Date, appError: string } = {
    startTime: null, endTime: null, discussionName: '', appStartDate: null, appError: '',
  }
  userId = Cookie.get('Id');

  constructor(private caseManagementService: CaseManagementService, private commonService: CaseManagementUtilService) {

  }

  ngOnInit() {
    console.log(this.contactsLists);
    let apData = { 'caseId': this.caseDetails.Id, 'userID': this.caseDetails.CaseCreatedBy }
    // if (this.caseDetails.InviteeId && this.caseDetails.InviteeId.length > 0) {
    this.getAppointmentsById(apData);
    // }

    // this.caseSocketService.connectSocket(this.caseDetails.CaseCreatedBy);
  }

  createNewAppointment() {
    if (this.caseDetails.InviteeId && this.caseDetails.InviteeId.length > 0) {
      this.isCreateApp = true;
    } else {
      this.showError('Atleast one Invitees should be there to add an appointment');
    }
  }
  cancelApp() {
    this.isCreateApp = false;
    // this.newAppointment = 
  }
  closeAppoint() {
    this.closeApptView.emit(this.caseDetails);
    this.vidyoComponent.disable();
    // if (this.vidyoComponent && this.vidyoComponent.isCallConnected) {
    //   this.vidyoComponent.disable();
    // }
    // this.commonService.notifyVidyoComp(this.caseDetails);
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

    let inv = this.caseDetails.InviteeId;

    let appData = { caseId: this.caseDetails.Id, appointmentTitle: this.newAppointment.discussionName, appointmentStartTime: startTimeFmt, appointmentEndTime: endTimeFmt, appointmentDate: appDateFmt, userID: this.caseDetails.CaseCreatedBy, inviteeId: inv, appointmentStatus: 0 }
    if (this.newAppointment.discussionName == '' || this.newAppointment.startTime == null || this.newAppointment.endTime == null || this.newAppointment.appStartDate == null) {
      console.log(this.newAppointment);
      this.newAppointment.appError = 'All fields are mandatory. Please enter valid details';
      setTimeout(() => {
        this.newAppointment.appError = '';
      }, 4000)
    } else if (startTimeFmt > endTimeFmt) {
      this.newAppointment.appError = 'Start time cannot be more than end time.';
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
      this.caseManagementService.addAppointment(appData).subscribe(res => {
        if (res.Header.Success) {
          this.showSuccess(res.Body.Message);
          this.isCreateApp = false;
          // let appointmentId = res.Body.Data.appointmentId;
          // this.appointments.push({ AppointmentDate: appData.appointmentDate, AppointmentTitle: appData.appointmentTitle, EndTime: appData.appointmentEndTime, StartTime: appData.appointmentStartTime, Id: appointmentId, status: appData.appointmentStatus, AppointmentCreatedBy: this.caseDetails.CaseCreatedBy });
          let apData = { 'caseId': this.caseDetails.Id, 'userID': this.caseDetails.CaseCreatedBy }
          this.getAppointmentsById(apData);
          this.caseDetails.AppointmentCount += 1;
          this.appointmentCount.emit(this.caseDetails);
        } else {
          // this.showError(res.Body.Message);
          this.newAppointment.appError = res.Header.Message;
          setTimeout(() => {
            this.newAppointment.appError = '';
          }, 5000)
        }
      })
    }
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: msg });
  }
  getAppointmentsById(apData) {
    this.caseManagementService.getAppointmentsBy(apData).subscribe(res => {
      this.appointments = res.Body.Data.Items;
    })
  }

  deleteAppointment(appointment) {
    console.log(appointment);
    let params = { 'userID': appointment.AppointmentCreatedBy, 'appointmentId': appointment.Id }
    this.caseManagementService.deleteAppointments(params).subscribe(res => {
      console.log(res);
      this.showSuccess(res.Body.Message);
      if (res.Header.Success) {
        console.log(this.appointments)
        this.appointments.splice(this.appointments.indexOf(appointment), 1);
        this.caseDetails.AppointmentCount -= 1;
        this.appointmentCount.emit(this.caseDetails);
      }
    })
  }

  //View appointment details
  viewApptDetails(id) {
    let apptId = { 'appointmentId': id };
    this.caseManagementService.viewAppointmentDetailsBy(apptId).subscribe(
      res => {
        console.log(this.appointmentDetails)
        this.appointmentDetails = res.Body.Data.Items;
        let inviteeIDs = this.appointmentDetails.AppointmentInvitees;
        if (inviteeIDs) {
          inviteeIDs.map(i => {
            i.InviteeName = this.contactsLists.find(c => c.Id == i.InviteeId) ? this.contactsLists.find(c => c.Id == i.InviteeId).FirstName : null;
            //  imagePath: this.contactsLists.find(c => c.Id == i.InviteeId) ? this.contactsLists.find(c => c.Id == i.InviteeId).imagepath : null;
            // Id: this.contactsLists.find(c => c.Id == i.InviteeId) ? this.contactsLists.find(c => c.Id == i.InviteeId).Id : null });
          })
        }
        console.log(this.appointmentDetails);
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
  startVidyoCall(appointment) {
    console.log(appointment);
    this.isVidyoOpen = true;
    setTimeout(() => {
      $('#VidyoConference').modal('show');
      $('#VidyoConference').modal({ backdrop: 'static', keyboard: false })
    }, 500);

    this.vidyoAppoint = appointment;
  }
  closeVidyo() {
    this.isVidyoOpen = false;
  }

  acceptAppointment(appointment) {
    console.table(appointment);
    let accParams = { invitedId: this.userId, appointmentId: appointment.Id }
    this.caseManagementService.acceptAppointment(accParams).subscribe(result => {
      if (result.Header.Success) {
      }
    },
      error => {
        console.log(error)
      },
      () => {
        this.appointments.map((ap) => {
          if (ap.Id = appointment.Id) {
            ap.InviteeConfirmationstatus = 1;
          }
        });
        console.log(this.appointments);
      }
    )
  }

  rejectAppointment(appointment) {
    console.log(appointment);
    let rejParams = { invitedId: this.userId, appointmentId: appointment.Id }
    this.caseManagementService.rejectAppointment(rejParams).subscribe(res => {
      if (res.Header.Success) {
        console.log(res.Body.Message);
      }
    },
      error => console.error(error),
      () => {
        this.appointments.map((ap) => {
          if (ap.Id = appointment.Id) {
            ap.InviteeConfirmationstatus = 2;
          }
        });
        console.log(this.appointments);
      }
    )
  }
}
