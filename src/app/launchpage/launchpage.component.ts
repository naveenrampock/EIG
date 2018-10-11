import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { LaunchPageService } from './launchingpage.service';
import { TranslateService } from '@ngx-translate/core';
declare var $;
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-launchpage',
  templateUrl: './launchpage.component.html',
  styleUrls: ['./launchpage.component.css']
})
export class LaunchpageComponent implements OnInit {

  // public permission: any;
  public caseDshboard: any;
  userId = Cookie.get('Id');
  permission = +Cookie.get('userType');
  public firstName = Cookie.get('firstName');
  public lastName = Cookie.get('lastName');
  caseLineChart: any;
  casePieChartData: { chartType: string; dataTable: (string | number)[][]; options: { title: string; width: number; height: number; }; };
  dicomLineChart: {
    chartType: string; dataTable: any[][]; options: {
      title: string;
      width: number; height: number; vAxis: { gridlines: { count: number; }; };
    };
  };
  usersPieChartData: { chartType: string; dataTable: (string | number)[][]; options: { title: string; width: number; height: number; }; };
  notifications: any;
  activities: any;
  usersCreationLineChart: any;
  emrDashboard: any;
  emrLineChart: { chartType: string; dataTable: any[][]; options: { title: string; width: number; height: number; vAxis: { gridlines: { count: number; }; }; }; };
  fileLineChart: any;
  // @ViewChild('cchart') cchart;

  constructor(private launchPageService: LaunchPageService) { }

  ngOnInit() {
    if (this.permission == 1) {
      // this.getCaseDashboardDetails();
      // this.getDicomDashboard();
      this.getuserDashboard();
    }
    if (this.permission == 3) {
      this.getuserNotifications();
      this.getuserActivitiess();
      this.getCaseDashboardDetails();
    }
  }

  generatePdf(arg1, arg2, arg3) {
    var doc = new jsPDF();
    doc.addImage(arg1.wrapper.visualization.getImageURI(), 0, 0);
    if (arg2) {
      doc.addPage();
      doc.addImage(arg2.wrapper.visualization.getImageURI(), 0, 0);
    }
    if (arg3) {
      doc.addPage();
      doc.addImage(arg3.wrapper.visualization.getImageURI(), 0, 0);
    }
    // let fileName = arg1.options.substr(0, 5).title.split(' ').join('_');
    let fileName = arg1.options.title.split(' ').join('_');
    doc.save(fileName + '.pdf');
  }

  onPrint(eleId): void {
    let printContents, popupWin;
    printContents = document.getElementById(eleId).innerHTML;
    popupWin = window.open('');
    popupWin.document.open();
    popupWin.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
            //........Customized style.......
            </style>
          </head>
      <body onload="window.print()" onfocus="window.close()">${printContents}</body>
        </html>`
    );
    popupWin.document.close();
  }

  getEmrDashboard() {
    this.launchPageService.getEMRDashboardDetails().subscribe(res => {
      this.emrDashboard = res.Body.Data;
      let adminEmr = res.Body.Data
      this.emrLineChart = {
        chartType: 'LineChart',
        dataTable: [
          ['EMR Created', 'EMR Created', 'EMR Shared With Invitees'],
          ['Daily', adminEmr.EMRSharingCounttoday, adminEmr.EMRSharingInvCounttoday],
          ['Weekly', adminEmr.EMRSharingCount7days, adminEmr.EMRSharingInvCount7days],
          ['Monthly', adminEmr.EMRSharingCountinmonth, adminEmr.EMRSharingInvCountinmonth],
          ['Yearly', adminEmr.EMRSharingCountinyear, adminEmr.EMRSharingInvCountinyear],
        ],
        options: {
          title: 'EMRs Creation Statistics',
          width: 700,
          height: 500,
          vAxis: { gridlines: { count: 10 } }
        }
      };
    });
  }
  getuserNotifications() {
    this.launchPageService.getuserNotifications().subscribe(res => {
      this.notifications = res.Body.Data;
      console.log(res);
    });
  }

  getuserActivitiess() {
    this.launchPageService.getuserActivitiess().subscribe(res => {
      this.activities = res.Body.Data;
      console.log(res);
    });
  }
  getuserDashboard() {
    this.launchPageService.getUsersDashboardDetails().subscribe(res => {
      console.log(res.Body.Data);
      let us = res.Body.Data;
      this.usersPieChartData = {
        chartType: 'PieChart',
        dataTable: [
          ['Users', 'Hours per Day'],
          ['Total', us.TotalUsers],
          ['Active', us.ActiveUsers],
          ['Deactivated', us.DeactivatedUsers],
          ['Deleted', us.DeletedUsers],
          ['Logged In', us.LoggedUsersWeb]
        ],
        options: {
          title: 'Summary of User Accounts',
          width: 700,
          height: 400,
        },
      };
      this.usersCreationLineChart = {
        chartType: 'LineChart',
        dataTable: [
          ['Time', 'Users Created'],
          ['Daily', us.UserCreatedToday],
          ['Weekly', us.UserCreatedin7days],
          ['Monthly', us.UserCreatedinMonth],
          ['Yearly', us.UserCreatedinYear],
        ],
        options: {
          title: 'User Creation Statistics',
          width: 700,
          height: 500,
          vAxis: { gridlines: { count: 10 } }
        }
      };
    });

  }
  getDicomDashboard() {
    this.launchPageService.getDicomDashboardDetails().subscribe(res => {
      let dicom = res.Body.Data.dicom;
      console.log(dicom);
      this.dicomLineChart = {
        chartType: 'LineChart',
        dataTable: [
          ['DICOM Uploaded', 'Shared', 'Unshared', 'Assigned', 'Unassigned'],
          ['Daily', dicom.DicomCountSharedToday, dicom.DicomCountUnSharedToday, dicom.DicomCountOwnerToday, dicom.DicomCountNotOwnerToday],
          ['Weekly', dicom.DicomCount7DaysShared, dicom.DicomCount7DaysUnShared, dicom.DicomCount7DaysOwner, dicom.DicomCount7DaysNotOwner],
          ['Monthly', dicom.DicomCountSharedMonthly, dicom.DicomCountUnSharedMonthly, dicom.DicomCountOwnerMonthly, dicom.DicomCountNotOwnerMonthly],
          ['Yearly', dicom.DicomCountSharedYearly, dicom.DicomCountUnSharedYearly, dicom.DicomCountOwnerYearly, dicom.DicomCountNotOwnerYearly],

          // ['Unshared', dicom.DicomCount7DaysUnShared, dicom.DicomCount7DaysUnShared, dicom.DicomCountUnSharedMonthly, dicom.DicomCountUnSharedYearly],
          // ['Assigned', dicom.DicomCount7DaysUnShared, dicom.DicomCount7DaysOwner, dicom.DicomCountOwnerMonthly, dicom.DicomCountOwnerYearly],
          // ['Unassigned', dicom.DicomCount7DaysNotOwner, dicom.DicomCount7DaysNotOwner, dicom.DicomCountNotOwnerMonthly, dicom.DicomCountNotOwnerYearly],
        ],
        options: {
          title: 'DICOM upload Statistics',
          // series: {
          //   0: { color: '#e2431e' },
          //   1: { color: '#e7711b' },
          //   2: { color: '#f1ca3a' },
          //   3: { color: '#f1ca3a' }
          // },
          width: 700,
          height: 500,
          vAxis: { gridlines: { count: 10 } }
        }
      };
    });
  }
  getCaseDashboardDetails() {
    this.launchPageService.getCaseDashboardDetails(this.userId, this.permission).subscribe(res => {
      this.caseDshboard = res.Body.Items.CaseCounttillnow;
      console.log(res.Body.Items);
      if (this.permission == 1 || 2) {
        let adminData = res.Body.Items;
        this.caseLineChart = {
          chartType: 'LineChart',
          dataTable: [
            ['Cases Created', 'Cases With Appointment', 'Cases Without Appointment'],
            ['Daily', adminData.CaseCountTodaywithAppointment, adminData.CaseCountTodaywithoutAppointment],
            ['Weekly', adminData.CaseCount7DayswithAppointment, adminData.CaseCount7DayswithoutAppointment],
            ['Monthly', adminData.CaseCountcurrentMonthwithAppointment, adminData.CaseCountcurrentMonthwithoutAppointment],
            ['Yearly', adminData.CaseCountcurrentYearwithAppointment, adminData.CaseCountcurrentYearwithoutAppointment],
          ],
          options: {
            title: 'Cases Creation Statistics',
            width: 700,
            height: 500,
            vAxis: { gridlines: { count: 10 } }
          }
        };

        this.casePieChartData = {
          chartType: 'PieChart',
          dataTable: [
            ['Cases', 'Total Cases'],
            ['Total Cases with Appointment', adminData.TotalCaseCountwithAppointment],
            ['Total Cases without Appointment', adminData.TotalCaseCountwithoutAppointment],
          ],
          options: {
            title: 'Summary of Cases',
            width: 700,
            height: 400,
          },
        };
      }

      // var a = res.Body.Items.CaseCountTillNow + 10;
      // var b = 0;
      // let interval = setInterval(() => {
      //   if (b < a) {
      //     b += Math.floor(a / 100);
      //     this.caseDshboard = b;
      //   }

      //   else {
      //     clearInterval(interval);
      //     console.log(this.caseDshboard)
      //   }
      // }, 1000)
      // console.log(interval);
    });
  }

  getFileDashboard() {
    this.launchPageService.getFileDashboard().subscribe((res) => {
      let admFile = res.Body.Data;
      this.fileLineChart = {
        chartType: 'LineChart',
        dataTable: [
          ['File Uploads', 'Files uploaded'],
          ['Daily', admFile.DocuementCountToday],
          ['Weekly', admFile.DocuementCount7Days],
          ['Monthly', admFile.DocuementCountinMonth],
          ['Yearly', admFile.DocuementCountinYear],
        ],
        options: {
          title: 'File upload Statistics',
          width: 700,
          height: 500,
          vAxis: { gridlines: { count: 10 } }
        }
      };
    })
  }
}
