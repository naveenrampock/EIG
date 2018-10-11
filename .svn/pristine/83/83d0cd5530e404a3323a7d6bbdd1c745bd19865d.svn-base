import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CaseManagementService } from '../case-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CONFIG } from '../../core';
import { DatePipe } from '@angular/common';

declare var $;
@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.css']
})
export class NewCaseComponent implements OnInit {

  savedCaseItem: any;
  savedCases: any;
  studyPkIds: Array<any> = [];
  isAddDicom: boolean;
  dicomList: any;
  contactIds: any;
  contacts: any;
  contactService: any;
  msgs: any[];
  public header: any;
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  userId = Cookie.get('Id');
  userType = Cookie.get('userType');
  gUid = Cookie.get('userID');
  uType = Cookie.get('uType');
  newCase: { CaseName: string, CaseDescription: string, errorMsg: string, Id: number } = { CaseName: '', CaseDescription: '', errorMsg: '', Id: 0 }
  configUrl = CONFIG.url;
  defaultImg = '../../../assets/images/avatars/User.png';
  inviteeIDs: Array<any> = [];
  uploadedFiles: Array<File> = [];
  isSavedCase: boolean = false;
  isContact: boolean = true;
  selectedIds: Array<any> = [];
  caseType = 'NewCase';
  comments: any;
  attachmentList: any;
  insertAttachmentList: Array<any> = [];
  appointments: Array<any> = [];
  newAppointment: { startTime: Date, endTime: Date, discussionName: string, appStartDate: Date, appError: string } = {
    startTime: null, endTime: null, discussionName: '', appStartDate: null, appError: '',
  }
  isCreateApp: boolean;
  caseDetails: any;
  appointmentCount: any;
  isNewAppointment: boolean;
  minSDate: Date = new Date(Date.now());
  userConfig: any;
  dashboardConfig: any;
  @Output() newCaseAdd: EventEmitter<any> = new EventEmitter();
  constructor(
    private caseManagementService: CaseManagementService,
    private router: Router,
    private routes: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.routes.params.subscribe(params => {
      let userId = params.id;
      let status = params.status;
      // if (userId && status) {
      //   this.getSavedCaselist(status, 'D', userId)
      // }
    })
    this.getUserConfig();
    this.getCaseDashboardDetails();
    this.getMyCaseList();

  }

  toggleMenu() {
    $("#wrapper").toggleClass("active");
    this.toggle.emit(this.header);
  }


  openContacts() {
    $('#PostedPopup').modal('show');
    this.getContactList();
  }

  postCase(Case, cStatus) {
    if (Case.CaseName.trim() == '' || Case.CaseDescription.trim() == '') {
      this.newCase.errorMsg = 'Case name or Case Description cannot be empty';
      setTimeout(() => {
        this.newCase.errorMsg = ''
      }, 5000);
    }

    else {
      if (this.userConfig && this.userConfig.HasCasemanagement) {
        let caseData = { caseId: Case.Id, caseName: Case.CaseName, caseDescription: Case.CaseDescription, status: cStatus, userID: this.userId, inviteeId: this.selectedIds.length > 0 ? this.selectedIds : null };
        if (this.dashboardConfig.CaseCountToday >= this.userConfig.Maxcasesperday) {
          this.newCase.errorMsg = `You Exceeded Max Case per day allowed. Please contact Administrator`;
          setTimeout(() => {
            this.newCase.errorMsg = ''
          }, 5000);
        }
        else if (this.dashboardConfig.CaseCount7Days >= this.userConfig.Maxcasesperweek) {
          this.newCase.errorMsg = `You Exceeded Max Case per week allowed. Please contact Administrator`;
          setTimeout(() => {
            this.newCase.errorMsg = ''
          }, 5000);
        }
        else if (this.dashboardConfig.CaseCountTillNow > this.userConfig.Maxtotalnumberofcasesallowed) {
          this.newCase.errorMsg = `You Exceeded Max Case allowed. Please contact Administrator`;
          setTimeout(() => {
            this.newCase.errorMsg = ''
          }, 5000);
        }
        else if (this.dashboardConfig.CaseApptCountDurationTillNow >= this.userConfig.Maxconferencelength) {
          this.newCase.errorMsg = `You Exceeded Max conference length allocated. Please contact Administrator`;
          setTimeout(() => {
            this.newCase.errorMsg = ''
          }, 5000);
        }
        else if (this.inviteeIDs.length > this.userConfig.Maxinviteesallowed) {
          this.newCase.errorMsg = `You Exceeded Max Invitees allowed per case. Please contact Administrator`;
          setTimeout(() => {
            this.newCase.errorMsg = ''
          }, 5000);
        }
        else {
          this.caseManagementService.postCase(caseData).subscribe(res => {
            if (res.Header.Success) {
              $('#PostedPopup').modal('hide');
              if (+res.Body.Data.caseId && (this.insertAttachmentList.length > 0)) {
                // this.callFileUpload(+res.Body.Data.caseId);
                this.insertaddList(+res.Body.Data.caseId);
              }
              if (+res.Body.Data.caseId && (this.studyPkIds.length > 0)) {
                this.addCaseDicomIds(+res.Body.Data.caseId);
              }
              if (+res.Body.Data.caseId && (this.appointments.length > 0)) {
                this.addAppointment(+res.Body.Data.caseId);
              }
              this.showSuccess(res.Body.Message);
              // setTimeout(() => {
              if (cStatus == 1) {
                this.router.navigate(['/case-management']);
                this.newCaseAdd.emit(cStatus);
                // window.location.reload();
              } else if (cStatus == 0) {
                this.router.navigate(['/case-management'], { queryParams: { CaseType: 0 } });
                this.newCaseAdd.emit(cStatus);
              } else {
                this.newCaseAdd.emit(cStatus);
              }
              // }, 1000);
            }
          })
        }
      }
      else {
        this.newCase.errorMsg = `You don't permission to create a Case. Please contact Administrator`;
        setTimeout(() => {
          this.newCase.errorMsg = ''
        }, 5000);
      }
    }

  }

  // openContactsSaved(savedCase) {
  //   this.caseManagementService.getContacts(this.gUid, 2)
  //     .subscribe(myContacts => {
  //       this.contacts = myContacts;
  //       console.log(savedCase);
  //       if (savedCase.InviteeId) {
  //         savedCase.InviteeId.map(id => {
  //           this.contacts.filter(c => c.Id == id).map(cn => {
  //             cn.isChecked = true;
  //             this.selectInvitee(cn.isChecked, id);
  //             return cn;
  //           })
  //         })
  //       }


  //       console.log(this.contacts);
  //     })
  //   this.isContact = false;
  //   $('#PostedPopup').modal('show');
  // }

  // postSavedCase(savedCase, cStatus) {
  //   let savedInviteeIds = savedCase.InviteeId;
  //   let caseData = { caseName: savedCase.CaseName, caseDescription: savedCase.CaseDescription, status: cStatus, uId: this.userId, inviteeId: savedInviteeIds.toString(), caseId: savedCase.Id };
  //   if (savedCase.CaseName.trim() == '' || savedCase.CaseDescription.trim() == '') {
  //     savedCase.errorMsg = 'Case name or Case Description cannot be empty';
  //     setTimeout(() => {
  //       savedCase.errorMsg = ''
  //     }, 5000);
  //   } else {
  //     this.caseManagementService.postCase(caseData).subscribe(res => {
  //       if (res.success) {
  //         $('#PostedPopup').modal('hide');
  //         if (caseData.caseId && (this.uploadedFiles.length > 0)) {
  //           this.callFileUpload(caseData.caseId);
  //         }
  //         if (caseData.caseId && (this.studyPkIds.length > 0)) {
  //           this.addCaseDicomIds(caseData.caseId);
  //         }

  //         this.showSuccess(res.message);
  //         setTimeout(() => {
  //           this.router.navigate(['/case-management/']);
  //         }, 3000);
  //       }
  //     })
  //   }
  // }

  getAppointments() {
    this.isNewAppointment = true;
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
  closeAppoint() {
    this.isNewAppointment = false;
  }
  selectStartDate() {
    this.minSDate = new Date(Date.now());
  }
  createNewAppointment() {
    if (this.inviteeIDs && this.inviteeIDs.length > 0) {
      this.isCreateApp = true;
    } else {
      this.showError('Atleast one Invitees should be there to add an appointment');
    }
  }
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: msg });
  }
  private getContactList() {
    if (this.isContact) {
      this.caseManagementService.getMyContacts(this.gUid, 2, 1, null, this.userId)
        .subscribe(myContacts => {
          this.contacts = myContacts.Body.Data.Item;;
        });
      this.isContact = false;
    }
  }

  selectInvitee(ev, id) {
    console.log(ev, id);
    if (ev) {
      this.inviteeIDs.push(id);
      console.log(this.inviteeIDs);
    }
    else {
      this.inviteeIDs.splice(this.inviteeIDs.indexOf(id), 1);
      console.log(this.inviteeIDs);
    }
  }

  selectedInviteeIds() {
    this.selectedIds = this.inviteeIDs;
    $('#PostedPopup').modal('hide');

  }
  // cancelInvitees(){
  //   $('#PostedPopup').modal('hide');
  // }

  // upload files
  // onUploadFile(event) {
  //   this.uploadedFiles = <Array<File>>event.target.files;
  // }

  // callFileUpload(caseId) {
  //   // const formData: any = new FormData();
  //   const files: Array<File> = this.uploadedFiles;
  //   this.caseManagementService.caseFileUpload(files, this.userId, caseId, '').subscribe(res => {
  //     if (res.success) {
  //       // this.showSuccess(res.message);
  //       console.log(res.message);
  //     }
  //   })
  // }
  getMyCaseList() {
    this.caseManagementService.getMyCaseList(this.userId)
      .subscribe((res) => {
        this.attachmentList = res.Body.Data.attachmentList;
        // for (var i = 0; i < this.attachmentList.length; i++) {
        //   this.insertAttachmentList.map(dId => {
        //     if (this.attachmentList[i].Id == dId) {
        //       console.log(this.attachmentList[i].Id);
        //       this.attachmentList[i].isChecked = true;
        //       this.attachmentList[i].isDisabled = true;
        //     }
        //   })
        // }
      })
  }
  insertCase(evt, list) {
    if (evt) {
      this.insertAttachmentList.push(list);
      console.log(this.insertAttachmentList);
    } else {
      this.insertAttachmentList.splice(this.insertAttachmentList.indexOf(list), 1);
      console.log(this.insertAttachmentList);
    }

  }

  insertaddList(Id) {
    let attachmentData = { 'userID': this.userId, 'caseId': Id, 'docId': this.insertAttachmentList.toString(), 'docType': 'Attachments' }
    this.caseManagementService.insertCaseList(attachmentData)
      .subscribe((res) => {
        // this.showSuccess("Attachment Linked to Case Successfully");
        // this.getCaselist(1, this.userId, null, 'DESC', null, null, null, null, null, null, null, 1, 10, null);
        this.insertAttachmentList = [];

      })
  }
  onUploadFile(files) {
    // console.log(event.target.files);
    // this.uploadedFiles = <Array<File>>event.target.files;
    this.uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);

    }
    // this.callFileUpload(this.addAttachmentList);
  }
  //Adding attachments to the case
  callFileUpload(Id) {
    // let caseList = this.addAttachmentList;
    const formData: any = new FormData();
    const files: Array<File> = this.uploadedFiles;
    this.caseManagementService.caseFileUpload(files, this.userId, Id, this.comments).subscribe(
      res => {
        if (res.Header.Code == 200) {
          // this.caseDocs.push({})
          console.log("asdfa", res)
          this.showSuccess(res.Header.message);
          // this.getDocumentsBy(caseList, this.docType);
        }
      },
      error => console.error('Error in uploading an Attachment'),
      () => {
        // this.caseLists.map(res => {
        //   if (res.Id == caseList.Id) {
        //     ++res.CaseDocuments;
        //   }
        // })
        this.getMyCaseList()

      }

    )
  }
  openDicom() {
    this.isAddDicom = true;
  }

  getDicomIds(event) {
    this.studyPkIds = event;
  }

  addCaseDicomIds(dCaseId) {
    let dicomData = { caseId: dCaseId, userID: this.userId, studyPkId: this.studyPkIds }
    this.caseManagementService.addCaseDicom(dicomData).subscribe(res => {
      console.log(res);
    })
  }
  deleteAppointment(app) {
    this.appointments.splice(this.appointments.indexOf(app), 1);
  }
  cancelApp() {
    this.isNewAppointment = false;
  }
  createAppointment() {
    // adApt.caseId, adApt.appointmentTitle, adApt.appointmentDate, adApt.appointmentStartTime, adApt.appointmentEndTime, adApt.uId

    let startTime = new DatePipe('en');
    let startTimeFmt = startTime.transform(this.newAppointment.startTime, "HH:mm:ss");
    let endTime = new DatePipe('en');
    let endTimeFmt = endTime.transform(this.newAppointment.endTime, "HH:mm:ss");
    let appDate = new DatePipe('en')
    let appDateFmt = appDate.transform(this.newAppointment.appStartDate, 'yyyy-MM-dd');

    let inv = this.inviteeIDs;

    let appData = { caseId: 0, appointmentTitle: this.newAppointment.discussionName, appointmentStartTime: startTimeFmt, appointmentEndTime: endTimeFmt, appointmentDate: appDateFmt, userID: this.userId, inviteeId: inv, appointmentStatus: 0 }
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
      this.appointments.push(appData);
      this.isCreateApp = false;
      this.newAppointment = {
        startTime: null, endTime: null, discussionName: '', appStartDate: null, appError: '',
      }
    }
  }

  addAppointment(caseId) {
    this.appointments.map(c => c.caseId = caseId);
    console.log(this.appointments);
    const appCaseData = { appType: 'NewAppointment', appointments: this.appointments }
    this.caseManagementService.addAppointment(appCaseData).subscribe(res => {
      if (res.Header.Success) {
        // this.showSuccess(res.Body.Message);
      } else {
        // this.showError(res.Body.Message);
        this.newAppointment.appError = res.Header.Message;
        setTimeout(() => {
          this.newAppointment.appError = '';
        }, 5000)
      }
    })
  }

  getUserConfig() {
    this.caseManagementService.getUserConfigurationById(this.gUid).subscribe(res => {
      this.userConfig = res.Body.Data;
      console.log(this.userConfig);
    });
  }

  getCaseDashboardDetails() {
    this.caseManagementService.getCaseDashboardDetails(this.userId, this.userType).subscribe(res => {
      this.dashboardConfig = res.Body.Items;
      console.log(this.dashboardConfig);
    });
  }
}

