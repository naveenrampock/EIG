import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AdminCaseManagementService } from './admin-case-management.service';
import { CONFIG } from '../core';
import { filterData } from './adminCase-data-model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-admin-case-management',
  templateUrl: './admin-case-management.component.html',
  styleUrls: ['./admin-case-management.component.css']
})
export class AdminCaseManagementComponent implements OnInit {

  editedCase: any;
  appointments: any;
  appointmentCase: any;
  appCaseId: any;
  DicomCaseId: any;
  inviteesList: any;
  inviteeCaseId: any;
  caseDocs: any;
  docCaseId: any;
  accountId: string;
  caseLists: any;
  contactsLists: any;
  userId = Cookie.get('Id');
  gUid = Cookie.get('userID');
  profilePic = Cookie.get('profilePic');
  configUrl = CONFIG.url;
  filterData: filterData = { caseId: null, createdBy: null, statusOpen: null, statusClosed: null, caseEndDate: null, caseFromDate: null, appointmentEndDateTime: null, appointmentId: null, appointmentStartDateTime: null, invtedId: null, appointmentQuantity: null }
  caseItems: any;
  createdBy: any;
  createByName: any;
  inviteeName: any;
  addAttachmentList: any;
  docType: any;
  caseDicomLists: any;
  uType = Cookie.get('userType');
  customRange: { fromDate: string, endDate: string } = { fromDate: null, endDate: null };
  isDicomMore: boolean;
  dicomMoreInfo: any;

  constructor(private adminCaseManagementService: AdminCaseManagementService) { }

  ngOnInit() {
    this.getCaselist(null, 0, null, 'DESC', null, null, null, null, null, null, null, 1, 10, null);
    this.accountId = localStorage.getItem('accountId_ls');
  }

  // Get full case list
  // getCaselist(status, userId, inviteeId, sortBy, appStTime, appEndTime, caseId, appointmentNumber, appointMentoption, fromDate, option, pageNo, pageSize, withAppointment) {
  //   // let param = { status: cStatus, sortBy: sortBy, userId: this.userId, fromDate: fromDate, enDate: enDate, }
  //   let param = { status: status, userId: userId, inviteeId: inviteeId, sortBy: sortBy, appStTime: appStTime, appEndTime: appEndTime, caseId: caseId, appointmentNumber: appointmentNumber, appointMentoption: appointMentoption, fromDate: fromDate, option: option, pageNo: pageNo, pageSize: pageSize, withAppointment: withAppointment }
  //   this.adminCaseManagementService.getCaseList(param).subscribe(res => {
  //     this.caseLists = res.Body.Data.Items;
  //     this.adminCaseManagementService.getContacts(this.gUid, 0)
  //       .subscribe(contacts => {
  //         this.contactsLists = contacts;
  //         this.mapContactCreatedCase();
  //       });
  //   })
  // }
  getCaselist(status, userId, inviteeId, sortBy, appStTime, appEndTime, caseId, appointmentNumber, appointMentoption, fromDate, option, pageNo, pageSize, withAppointment) {
    // let param = { status: cStatus, sortBy: sortBy, userId: this.userId, fromDate: fromDate, enDate: enDate, }
    let param = { status: status, userID: userId, inviteeId: inviteeId, sortBy: sortBy, appStTime: appStTime, appEndTime: appEndTime, caseId: caseId, appointmentNumber: appointmentNumber, appointMentoption: appointMentoption, fromDate: fromDate, option: option, pageNo: pageNo, pageSize: pageSize, withAppointment: withAppointment }
    this.adminCaseManagementService.getCaseList(param).subscribe(
      res => {
        this.caseLists = res.Body.Data.Items;
        this.caseItems = res.Body.Data;
      },
      error => {
        console.log(error)
      },
      () => {
        this.mapContactCreatedCase();
      })
  }
  mapContactCreatedCase() {
    // this.adminCaseManagementService.getAllContacts(this.gUid, 0, 1, this.userId, '1187, 1408')
    this.adminCaseManagementService.getAllContacts(this.gUid, 0, 1, this.userId, null)
      .subscribe(
        myContacts => {
          this.contactsLists = myContacts.Body.Data.Item;
        },
        error => console.log(error),
        () => {
          this.caseLists.map(cs => {
            cs.CaseCreatedByName = this.contactsLists.find(cont => cont.Id == cs.CaseCreatedBy) ? this.contactsLists.find(cont => cont.Id == cs.CaseCreatedBy).FirstName : null;
            cs.CaseCreatedByProfilePic =
              this.contactsLists.find(cont => cont.Id == cs.CaseCreatedBy) ? this.contactsLists.find(cont => cont.Id == cs.CaseCreatedBy).imagepath : null;
            cs.Comments ? cs.Comments.map((cId) => {
              cId.CommentCreatedByName =
                this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy) ? this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy).FirstName : null;
              cId.CommentCreatedByProfile =
                this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy) ? this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy).imagepath : null;
            }) : null
          });
          console.log(this.caseLists);
        }
      );
  }

  // Get Documents by caseId
  // getDocumentsBy(caseList) {
  //   this.docCaseId = caseList.Id;
  //   this.adminCaseManagementService.getDocumentsByCaseId(this.docCaseId).subscribe(res => {
  //     this.caseDocs = res.Body.Data.Items;
  //     console.log(this.caseDocs)
  //   })
  //   caseList.isDoc = true;
  //   caseList.isInviteeHide = false;
  //   caseList.isDicomShow = false;
  //   caseList.isAppointment = false;
  // }

  getDocumentsBy(caseList, doctype) {
    console.log(caseList.Documents);
    var docIds = [];
    if (caseList.Documents) {
      caseList.Documents.map(r => {
        docIds.push(r.DocumentId);
        docIds.toString();
        console.log(r.DocumentId);
      })
    }

    let CaseDocumentsList = docIds.toString();
    this.caseDocs = [];
    this.docType = doctype;
    this.addAttachmentList = caseList;
    this.docCaseId = caseList.Id;
    if (CaseDocumentsList) {
      this.adminCaseManagementService.getDocumentsByDocId(CaseDocumentsList).subscribe(res => {
        caseList.Documents.map(s => {
          res.Body.Data.attachmentList.find(r => r.Id == s.DocumentId).DocsIds = [];
          res.Body.Data.attachmentList.find(r => r.Id == s.DocumentId).DocsIds.push(s.CaseDocumentAutoId);
        })
        this.caseDocs = res.Body.Data.attachmentList;
        this.caseDocs.map(i => {
          i.InviteeName = this.contactsLists.find(c => c.Id == i.CreatedBy) ? this.contactsLists.find(c => c.Id == i.CreatedBy).FirstName : null;
        })
      })
    } else {
      console.log("No Records Found");
    }

    caseList.isDoc = true;
    caseList.isInviteeHide = false;
    caseList.isDicomShow = false;
    caseList.isAppointment = false;
  }
  // getDicomsBy(caseList) {
  //   this.DicomCaseId = caseList.Id;
  //   caseList.isDoc = false;
  //   caseList.isDicomShow = true;
  //   caseList.isInviteeHide = false;
  //   caseList.isAppointment = false;
  // }
  viewDicom(dicom) {
    console.log(dicom);
  }
  dicomDetails(dicom) {
    this.isDicomMore = true;
    this.dicomMoreInfo = dicom;
  }
  getDicomsBy(caseList) {
    console.log(caseList);
    this.DicomCaseId = caseList.Id;
    caseList.isDoc = false;
    caseList.isDicomShow = true;
    caseList.isInviteeHide = false;
    caseList.isAppointment = false;
    console.log(caseList.CaseDICOMDocuments)
    if (caseList.CaseDICOMDocuments) {
      let studyPkId = caseList.CaseDICOMDocuments.toString();
      let params = {
        studyPK: studyPkId,
        patientId: null,
        patientName: null,
        cStartDate: null,
        cEndDate: null,
        uStartDate: null,
        uEndDate: null,
        modality: null,
        userID: null,
        pageNumber: 1,
        pageSize: 10,
        userType: this.uType,
        shareByothers: null,
        myUpload: null,
        myImage: null,
        uploadedBy: null,
        ownedBy: null,
        sharedTo: null,
        paramHospitalName: null,
        studyId: null,
        studyUId: null,
      };
      if (studyPkId) {
        this.adminCaseManagementService.getDicomList(params)
          .subscribe((res) => {
            console.log(res);
            this.caseDicomLists = res.Body.Data.dicomList;
            console.log(this.caseDicomLists);
            // this.totalCount = res.Body.Data.TotalItemCount;
          })
      }
    }
  }
  hideAttachments(caseList) {
    caseList.isDoc = false;
  }
  hideDicomAttach(caseList) {
    caseList.isDicomShow = false;
  }

  getInvitees(caseList) {
    this.inviteeCaseId = caseList.Id;
    let inviteeIDs = caseList.InviteeId;
    let contactDetails = [];
    if (inviteeIDs) {
      inviteeIDs.map(i => {
        contactDetails.push({ name: this.contactsLists.find(c => c.Id == i).FirstName, imagePath: this.contactsLists.find(c => c.Id == i).imagepath, Id: this.contactsLists.find(c => c.Id == i).Id });
      })
    }
    caseList.isInviteeHide = !caseList.isInviteeHide;
    inviteeIDs = contactDetails;
    this.inviteesList = inviteeIDs;
    caseList.isDoc = false;
    caseList.isDicomShow = false;
    caseList.isAppointment = false;
  }

  // Closing invited contact list
  closeInvitees(caseList) {
    caseList.isInviteeHide = false;
  }

  toggleCaseStatus(caseList) {
    caseList.isOpen = !caseList.isOpen;
  }

  applyFilter() {
    let dData = this.filterData;
    console.log(dData);
    dData.statusOpen = dData.statusOpen ? 1 : null;
    dData.statusClosed = dData.statusClosed ? 2 : null;
    dData.invtedId = dData.invtedId ? dData.invtedId : null;
    dData.caseId = dData.caseId ? dData.caseId : null;
    dData.appointmentId = dData.appointmentId ? dData.appointmentId : null;
    dData.appointmentQuantity = dData.appointmentQuantity ? dData.appointmentQuantity : null;
    // dData.appointmentStartDateTime = dData.appointmentStartDateTime ? dData.appointmentStartDateTime : null;
    // dData.appointmentEndDateTime = dData.appointmentEndDateTime ? dData.appointmentEndDateTime : null;
    let startTime = new DatePipe('en');
    let startTimeFmt = startTime.transform(dData.appointmentStartDateTime, "HH:mm:ss");
    let endTime = new DatePipe('en');
    let endTimeFmt = endTime.transform(dData.appointmentEndDateTime, "HH:mm:ss");


    dData.createdBy = dData.createdBy ? dData.createdBy : 0;
    if (!this.createByName) {
      dData.createdBy = 0;
    }
    if ((!dData.statusOpen && !dData.statusClosed) || (dData.statusOpen && dData.statusClosed)) {
      dData.statusOpen = null;
      dData.statusClosed = null;
    }

    this.getCaselist(dData.statusOpen || dData.statusClosed, dData.createdBy, dData.invtedId, 'DESC', startTimeFmt, endTimeFmt, dData.caseId, dData.appointmentId, dData.appointmentQuantity, this.customRange.fromDate, this.customRange.endDate, 1, 10, null);
  }

  clearFilters() {
    this.filterData = this.filterData;
  }
  //Closing a case
  updateCase(caseList, cStatus) {
    let clCase = { caseId: caseList.Id, status: cStatus, userID: this.userId, }
    this.adminCaseManagementService.closeCase(clCase).subscribe(res => {
      if (res.Header.Success) {
        // this.showSuccess(res.message);
        this.getCaselist(null, 0, null, 'DESC', null, null, null, null, null, null, null, 1, 10, null);
      }
    })
  }

  getAppointments(caseList) {
    this.appCaseId = caseList.Id;
    caseList.isAppointment = true;
    caseList.isDoc = false;
    caseList.isDicomShow = false;
    caseList.isInviteeHide = false;
    this.appointmentCase = caseList;
    let apData = { 'caseId': caseList.Id, 'userID': caseList.CaseCreatedBy }
    if (caseList.AppointmentCount > 0) {
      this.adminCaseManagementService.getAppointmentsBy(apData).subscribe(res => {
        this.appointments = res.Body.Data.Items;
      })
    }
  }

  closeAppointment(evt) {
    evt.isAppointment = false;
  }
  openEditCasePopup(editedCaseList, profilePic, accountId) {
    editedCaseList.isEditWindowOpen = true;
    this.editedCase = editedCaseList;
    this.editedCase.profilePic = profilePic;
    this.editedCase.CaseCreatedByName = accountId;
  }

  closedEdit(evt) {
    evt.isEditWindowOpen = false;
  }

  scrollDown() {
    console.log('scrolled!!');
    // this.getCaselist(1, this.userId, null, 'DESC', null, null, null, null, null, null, null, 1, 10, null);
    if (this.caseLists) {

      if (this.caseItems.TotalItemCount > this.caseLists.length) {
        this.filterData.statusOpen = this.filterData.statusOpen ? 1 : null;
        this.filterData.statusClosed = this.filterData.statusClosed ? 2 : null;
        if ((!this.filterData.statusOpen && !this.filterData.statusClosed) || (this.filterData.statusOpen && this.filterData.statusClosed)) {
          this.filterData.statusOpen = null;
          this.filterData.statusClosed = null;
        }
        this.filterData.createdBy = this.filterData.createdBy ? this.filterData.createdBy : 0;
        let param = { status: this.filterData.statusOpen || this.filterData.statusClosed, userID: this.filterData.createdBy, inviteeId: this.filterData.invtedId, sortBy: 'DESC', appStTime: null, appEndTime: null, caseId: null, appointmentNumber: null, appointMentoption: null, fromDate: null, option: null, pageNo: this.caseItems.Page + 1, pageSize: 10, withAppointment: null }
        this.adminCaseManagementService.getCaseList(param).subscribe(
          res => {
            let newList = res.Body.Data.Items
            let oldList = this.caseLists;
            this.caseLists = oldList.concat(newList);
            // this.isInvitedCase = false;
            console.log(this.caseLists);
            this.caseItems.Page = res.Body.Data.Page;
            // this.contactsLists = contacts.Body.Data.Item;
          },
          error => {
            console.log(error)
          },
          () => {
            // pageNo += 1;
            this.mapContactCreatedCase();
          })
      }
      else {
        console.log('End of data');
      }
    }
  }

  filter(evt, to) {
    console.log(evt);
    this.adminCaseManagementService.getSingleUser(evt.query)
      .subscribe((res) => {
        setTimeout(() => {
          console.log(res.Body.Data)
          this.createdBy = res.Body.Data;
        }, 100);
      })
  }

  handleDropdown(event, to) {
    this.filterData.createdBy = event.Id;
  }

  handleDropdownInv(event, to) {
    this.filterData.invtedId = event.Id;
  }

  reset() {
    this.getCaselist(null, 0, null, 'DESC', null, null, null, null, null, null, null, 1, 10, null);
    this.filterData.createdBy = null;
    this.filterData.statusOpen = null;
    this.filterData.statusClosed = null;
    this.filterData.caseFromDate = null;
    this.filterData.caseEndDate = null;
    this.filterData.appointmentStartDateTime = null;
    this.filterData.appointmentEndDateTime = null;
    this.filterData.appointmentQuantity = null;
    this.filterData.appointmentId = null;
    this.filterData.invtedId = null;
    this.filterData.appointmentQuantity = null;
    this.createByName = null;
    this.inviteeName = null;
    this.filterData.caseId = null;
  }

  selectFromDate() {
    let fromDate = new DatePipe('en').transform(this.filterData.caseFromDate, 'yyyy-MM-dd');
    this.customRange.fromDate = fromDate;
    console.log(fromDate);

  }
  selectEndDate() {
    let endDate = new DatePipe('en').transform(this.filterData.caseEndDate, 'yyyy-MM-dd');
    this.customRange.fromDate = endDate;
    console.log(endDate);
    // this.filterData.caseEndDate = endDate ? endDate : null;
  }

  toggleDesc(caseList) {
    caseList.isCaseDesc = !caseList.isCaseDesc;
  }

}
