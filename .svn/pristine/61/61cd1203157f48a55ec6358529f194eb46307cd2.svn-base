import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CaseManagementService } from '../../case-management.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CONFIG } from '../../../core';
import { CaseManagementUtilService } from '../../case-management-util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { ScrollEndDirective } from '../../../shared/directives/scroll-end.directive';

declare var $;

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit {
  appCaseId: any;
  appointmentCase: any;
  caseDicoms: any;
  DicomCaseId: any;
  caseToAddDciom: any;
  isAddDicom: boolean = false;
  studyPkIds: any;
  inviteeCaseId: any;
  editedCase: any;
  inviteesList: any;
  accountId: string;
  contactsLists: any;
  uploadedFiles: File[];
  // uploadedFiles:  Array<any> = []
  uploadedCommentFiles: File[];
  docCaseId: any;
  caseDocs: any;
  isAttachement: boolean = false;
  inviteeAppIDs: Array<any> = [];
  appointContacts: any;
  inviteeCount: any;
  caseHideId: any;

  msgs: any[];
  inviteeIDs: Array<any> = [];
  contacts: any;
  fieldName1: any;
  caseID: any;
  commentsDetails: any;
  caseLists: Array<any> = [];
  public header: any;
  userId = Cookie.get('Id');
  gUid = Cookie.get('userID');
  profilePic = Cookie.get('profilePic');
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  isMore: boolean = false;
  commentValue = '';
  configUrl = CONFIG.url;
  defaultImg = '../../../assets/images/avatars/User.png';
  postTypeMsgs: { postTypename: string, isPosted: boolean, isUnpost: boolean, case: number } = { postTypename: '', isPosted: true, isUnpost: true, case: null };
  caseType = 'PostedCase';
  myCaseType: { description: string, status: number } = { description: 'View Case', status: 1 };
  attachmentObj: { type: any, attachmentPath: SafeResourceUrl } = { type: '', attachmentPath: '' };
  addAttachmentList: any;
  attachmentList: any;
  insertAttachmentList: Array<any> = [];
  docType: string;
  comments: any = '';
  uType = Cookie.get('userType');
  caseDicomLists: any;
  caseItems: any;
  commentsData: any;
  dicomMoreInfo: any;
  isDicomMore: boolean;
  @ViewChild('folderInput') filesSelected: any;
  caseTypeNew: any;
  commentsError: string;
  firstName: any;
  lastName: any;
  isCaseCreated: boolean = false;
  appointmentStatus: any;
  sortValue: any;

  constructor(private caseManagementService: CaseManagementService, private routes: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getMyDraftList();
    this.profilePic;
    this.accountId = localStorage.getItem('accountId_ls');
    this.firstName = Cookie.get('firstName');
    this.lastName = Cookie.get('lastName');
    this.sortValue = 'DESC';
    this.routes.queryParams.subscribe((para) => {
      this.caseTypeNew = para.CaseType;

      if (para.appointment == 'true') {
        this.appointmentStatus = 1;
      } else if (para.appointment == 'false') {
        this.appointmentStatus = 0;
      }
      else {
        this.appointmentStatus = null;
      }
      if (this.caseTypeNew == 0) {
        this.getCaselist(0, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, this.appointmentStatus);
      }
      else if (this.caseTypeNew == 2) {
        this.getCaselist(2, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, this.appointmentStatus);
      }
      else {
        this.getCaselist(1, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, this.appointmentStatus);
      }

    });
  }
  getMyDraftList() {
    this.routes.params.subscribe(para => {
      if (para.cStatus && para.sort) {
        this.myCaseType.status = para.cStatus;
        if (para.cStatus == 2) {
          this.myCaseType.description = 'My Closed Cases';
        }
        else if (para.cStatus == 0) {
          this.myCaseType.description = 'My Draft List';
        }
      } else {
        this.getCaselist(1, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, null);
      }
    })
  }
  toggleMenu() {
    $("#wrapper").toggleClass("active");
    this.toggle.emit(this.header);
  }
  // Get full case list
  getCaselist(status, userId, inviteeId, sortBy, appStTime, appEndTime, caseId, appointmentNumber, appointMentoption, fromDate, option, pageNo, pageSize, withAppointment) {
    let param = { status: status, userID: userId, inviteeId: inviteeId, sortBy: sortBy, appStTime: appStTime, appEndTime: appEndTime, caseId: caseId, appointmentNumber: appointmentNumber, appointMentoption: appointMentoption, fromDate: fromDate, option: option, pageNo: pageNo, pageSize: pageSize, withAppointment: withAppointment }
    this.caseManagementService.getCaseList(param).subscribe(
      res => {
        this.caseLists = res.Body.Data.Items;
        this.caseItems = res.Body.Data;
        // this.contactsLists = contacts.Body.Data.Item;
      },
      error => {
        console.log(error)
      },
      () => {
        this.mapContactCreatedCase();
      })
  }
  callGetCaseList(status) {
    this.isCaseCreated = true;
    console.log(status);
    this.getCaselist(status, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, null);
    setTimeout(() => {
      this.isCaseCreated = false;
    }, 1000);
  }

  getMyCaseList(caseList) {
    this.caseManagementService.getMyCaseList(this.userId)
      .subscribe((res) => {
        this.attachmentList = [];
        console.log(caseList);
        let docIds = caseList.Documents;
        this.attachmentList = res.Body.Data.attachmentList;
        if (docIds) {
          for (var i = 0; i < this.attachmentList.length; i++) {
            docIds.map(dId => {
              if (this.attachmentList[i].Id == dId.DocumentId) {
                console.log(this.attachmentList[i].Id);
                this.attachmentList[i].isChecked = true;
                this.attachmentList[i].isDisabled = true;
              }
            })
          }
        }
        $("#openAttachmentList").modal('show');
      });
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

  insertaddList() {
    let attachmentData = { 'userID': this.userId, 'caseId': this.docCaseId, 'docId': this.insertAttachmentList.toString(), 'docType': this.docType }
    this.caseManagementService.insertCaseList(attachmentData)
      .subscribe((res) => {
        this.showSuccess("Attachment Linked to Case Successfully");
        this.getCaselist(1, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, null);
        this.insertAttachmentList = [];

      })
  }

  // More/Less in case description
  toggleDesc(caseList) {
    caseList.isCaseDesc = !caseList.isCaseDesc;
  }

  //Adding comments to the case
  addComment(caseList) {
    caseList.Comments = caseList.Comments ? caseList.Comments : [];
    if (caseList.comment.trim() !== '') {
      let comments = { caseId: caseList.Id, comment: caseList.comment, userID: this.userId }
      if (caseList.comment && caseList.comment.length > 500) {
        this.commentsError = 'Only 500 Characters are allowed';
        setTimeout(() => {
          this.commentsError = '';
        }, 5000);

      }
      else {
        this.caseManagementService.addComments(comments).subscribe(com => {
          if (com.Header.Success) {
            // this.getComments(caseList);


            let addComments = { CommentId: com.Body.Data.commentId, Comment: caseList.comment, CommentCreatedBy: this.userId, CommentCreatedDate: new Date(Date.now()), CommentCreatedByName: null, CommentCreatedByProfile: null }
            caseList.Comments.push(addComments);
            console.log(caseList.Comments);
            // this.caseLists.map(c => {
            // console.log(com.Body.Data.Items);
            // com.Body.Data.Items.map(e => {
            //   if (caseList.Id == e.CaseId) {
            //     caseList.Comments = com.Body.Data.Items;
            //   }
            //   // })
            // });
            // this.mapContactCreatedCase();
            caseList.comment = '';



            // if (this.invitedCaseDetails) {
            //   this.invitedCaseDetails.map(i => {
            //     com.comments.map(e => {
            //       if (i.Id == e.CaseId) {
            //         i.Comments = com.comments;
            //       }
            //     })
            //   });
            //   this.mapContactInvitedCase();
            // }
          }
        });
      }
    }
  }
  //Enable Editing comments
  editComment(cmnt) {
    cmnt.isEdit = !cmnt.isEdit;
  }

  // Edited Comments
  sendEditedComment(eComment, caseId) {
    if (eComment.Comment.trim() !== '') {
      let comments = { caseId: eComment.CaseId | caseId, comment: eComment.Comment, commentId: eComment.Id | eComment.CommentId, userID: this.userId }
      this.caseManagementService.updateComments(comments).subscribe(com => {
        if (com.Header.Success) {
          eComment.isEdit = false;
        } else {
          this.showError(com.Body.Message);
        }
      });
    }
  }

  // Delete comments by caseId and and comment Id
  deleteComment(delcmmnt, caseList, commentType) {
    console.log(delcmmnt, caseList);
    let delBody = { commentId: delcmmnt.CommentId }
    this.caseManagementService.deleteComments(delBody).subscribe(res => {
      if (res.Header.Success) {
        caseList.Comments.splice(caseList.Comments.indexOf(delcmmnt), 1);
        if (commentType == 'moreComments') {
          this.commentsDetails.splice(this.commentsDetails.indexOf(delcmmnt), 1);
        }
        if (caseList.Comments.length == 0) {
          // caseList.isMore = true;
        }
      }
    })
  }

  //Get comments by Id on click of more in comment section
  getComments(caseList) {
    let pageNo = 1;
    let pageSize = 10;
    caseList.isMore = true;
    this.caseHideId = caseList.Id
    this.caseManagementService.getCommentsByCaseId(caseList.Id, pageNo, pageSize).subscribe(res => {
      this.commentsDetails = res.Body.Data.Items;
      this.commentsData = res.Body.Data;
      if (this.caseLists) {
        res.Body.Data.Items.map(e => {
          if (caseList.Id == e.CaseId) {
            caseList.Comments = res.Body.Data.Items;
          }
        })
        this.mapContactCreatedCase();
      }
    })
  }

  // Hide comments section on cick of hide in comment section
  hideComments(caseList) {
    caseList.isMore = false;
  }

  // Open/Close case actions on top right 
  toggleCaseStatus(caseList) {
    caseList.isOpen = !caseList.isOpen;
  }

  // Post/Unpost case - add/delete invitees from the case
  openPostedModal(caseList, postType) {
    $('#PostedCase').modal('show');
    this.postTypeMsgs.postTypename = postType;
    this.getContactList(caseList, postType);
    this.postTypeMsgs.case = caseList;
    this.inviteeIDs = [];
  }

  getContactList(caseList, postType) {
    let contactList = [];
    if (postType == "Posted") {
      // this.caseLists.map(caseObj => {
      //   if (caseId == caseObj.Id && caseObj.InviteeId) {
      if (caseList.InviteeId.length > 0) {
        caseList.InviteeId.map(inIds => {
          if (inIds) {
            contactList = this.contactsLists
            contactList.filter(cont => cont.Id == inIds).map(c => {
              c.isChecked = true;
              c.isDisabled = true;
              return c;
            });
          }
        });
      } else {
        this.contactsLists.map(c => {
          c.isChecked = false;
          c.isDisabled = false;
          return c;
        });
      }
      //   }
      // });
      // })
      // }
    }
    // else {
    //   // if (this.postTypeMsgs.isUnpost) {
    //   this.caseManagementService.getMyContacts(this.gUid, 2, 1)
    //     .subscribe(myContacts => {
    //       this.contacts = myContacts.Body.Data.Item;
    //       console.log(this.caseLists);
    //       this.caseLists.map(caseObj => {
    //         if (caseId == caseObj.Id && caseObj.InviteeId) {
    //           caseObj.InviteeId.map(inIds => {
    //             if (inIds) {
    //               var postlist = this.contacts.filter(cont => cont.Id == inIds).map(c => {
    //                 c.isChecked = false;
    //                 c.isDisabled = false;
    //                 return c;
    //               });
    //             }
    //           });
    //         }
    //       });
    //     })
    //   // }
    // }
  }

  addInvitees(add, caseList) {
    let invitees = { Invitees: this.inviteeIDs, CaseId: caseList.Id, userID: this.userId }
    this.caseManagementService.updateInvitee(invitees).subscribe(res => {
      if (res.Header.Success) {
        caseList.InviteeId.push(...invitees.Invitees);
        this.showSuccess(res.Body.Message);
        $('#PostedCase').modal('hide');
        this.getInvitees(caseList);
        // this.getCaselist(1, 'D');
      }
    })
  }

  // Delete invitees to the case in the posted section
  deleteInvitees(caseId, id) {
    let invitees = { Invitees: id, CaseId: caseId }
    this.caseManagementService.deleteInvitee(invitees).subscribe(res => {
      if (res.Header.Success) {
        this.showSuccess(res.Body.Message);
        $('#PostedCase').modal('hide');
        // this.getCaselist(1, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, 'User');
        this.removeCaseInvitedData(id);

      }
    })
  }

  // Remove invitee details from the case.
  removeCaseInvitedData(id) {
    let invitees = { 'userID': this.userId, 'inviteeId': id }
    this.caseManagementService.removeCaseInvitedData(invitees).subscribe(res => {
      this.getCaselist(1, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, null);
      console.log(res);
    });
  }
  // Checkboox selection in the Posted/Unposted section of the case
  selectInvitee(event, id) {
    if (event.target.checked) {
      this.inviteeIDs.push(id);
    }
    else {
      this.inviteeIDs.splice(this.inviteeIDs.indexOf(id), 1);
    }
  }

  // Show toast messages for succcess
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  // Show toast messages for Errors
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: msg });
  }

  // Invited case details related code goes here


  //Closing a case
  updateCase(caseList, cStatus) {
    let clCase = { caseId: caseList.Id, status: cStatus, userID: this.userId }
    this.caseManagementService.closeCase(clCase).subscribe(res => {
      if (res.Header.Success) {
        this.showSuccess(res.Body.Message);
        if (cStatus == 1) {
          this.router.navigate(['./case-management']);
        }
        else if (cStatus == 2) {
          this.router.navigate(['./case-management'], { queryParams: { CaseType: 2 } });
        }
        // this.getCaselist(1, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, null);
      }
    })
  }

  // Get Documents by caseId
  getDocumentsBy(caseList, doctype) {
    console.log(caseList.Documents);
    var docIds = [];
    if (caseList.Documents) {
      caseList.Documents.map(r => {
        docIds.push(r.DocumentId);
      })
    }
    let CaseDocumentsList = docIds.toString();
    this.caseDocs = [];
    this.docType = doctype;
    this.addAttachmentList = caseList;
    this.docCaseId = caseList.Id;
    if (CaseDocumentsList) {
      this.caseManagementService.getDocumentsByDocId(CaseDocumentsList).subscribe(res => {
        this.caseDocs = res.Body.Data.attachmentList;
        this.caseDocs.map(i => {
          i.InviteeName = this.contactsLists.find(c => c.Id == i.CreatedBy) ? this.contactsLists.find(c => c.Id == i.CreatedBy).FirstName : null;
        })
        console.log(this.caseDocs);
        for (let i = 0; i < caseList.Documents.length; i++) {
          for (let j = 0; j < this.caseDocs.length; j++) {
            if (caseList.Documents[i].DocumentId == this.caseDocs[j].Id) {
              this.caseDocs[j].DocId = caseList.Documents[i].CaseDocumentId
            }
          }
        }
      })

    } else {
      console.log("No Records Found");
    }

    caseList.isDoc = true;
    caseList.isInviteeHide = false;
    caseList.isDicomShow = false;
    caseList.isAppointment = false;
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
        // userId: this.userId,
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
        this.caseManagementService.getDicomList(params)
          .subscribe((res) => {
            console.log(res);
            this.caseDicomLists = res.Body.Data.dicomList;
            console.log(this.caseDicomLists);
            // this.totalCount = res.Body.Data.TotalItemCount;
          })
      }
    }
  }

  viewDicom(dicom) {
    console.log(dicom);
  }
  dicomDetails(dicom) {
    this.isDicomMore = true;
    this.dicomMoreInfo = dicom;
  }
  // Hide atttachments div on click of close button
  hideAttachments(caseList) {
    caseList.isDoc = false;
  }
  hideDicomAttach(caseList) {
    caseList.isDicomShow = false;
  }

  // Deleting Dicom by studyId
  deleteDicom(caseList, dicom) {
    console.log(caseList, dicom);
    this.caseManagementService.deleteCaseDocBy(dicom.StudyPk).subscribe(res => {
      // this.caseDocs = res.Body.Data;
      if (res.Header.Success) {
        this.caseDicomLists.splice(this.caseDicomLists.indexOf(dicom), 1);
      }
    },
      error => console.error('Error in Deleting an attachment'),
      () => {
        if (caseList.Id) {
          --caseList.CaseDICOMDocuments.length;
        }
      })
  }

  // Deleting Doc by docID
  deleteDocBy(caseList, doc) {
    this.caseManagementService.deleteCaseDocBy(doc.DocId).subscribe(res => {
      // this.caseDocs = res.Body.Data;
      this.caseDocs.splice(this.caseDocs.indexOf(doc), 1)
    },
      error => console.error('Error in Deleting an attachment'),
      () => {
        --caseList.CaseDocuments;
        caseList.Documents.splice(caseList.Documents.indexOf(doc), 1);
        console.log(caseList.Documents);
      }
    )
  }

  //Adding attachments to the case
  // onUploadFile(event, caseList) {
  //   this.uploadedFiles = <Array<File>>event.target.files;
  //   this.callFileUpload(caseList);
  // }

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
  callFileUpload() {
    let caseList = this.addAttachmentList;
    const formData: any = new FormData();
    const files: Array<File> = this.uploadedFiles;
    // console.log(this.filesSelected.nativeElement.files);
    // this.filesSelected.nativeElement.value = "";
    // console.log(this.filesSelected.nativeElement.files);
    this.caseManagementService.caseFileUpload(files, this.userId, caseList.Id, this.comments).subscribe(
      res => {
        if (res.Header.Code == 200) {
          // this.caseDocs.push({})
          console.log("asdfa", res)
          this.showSuccess(res.Header.message);
          this.getDocumentsBy(caseList, this.docType);
        }
      },
      error => console.error('Error in uploading an Attachment'),
      () => {
        // this.caseLists.map(res => {
        //   if (res.Id == caseList.Id) {
        //     ++res.CaseDocuments;
        //   }
        // })
        this.comments = '';
        this.filesSelected.nativeElement.value = "";
      }

    )
  }

  mapContactCreatedCase() {
    var invitIds = [];
    // Adding contactname and profile pic to the comments
    // var Ids = [];
    // this.caseLists.map(cs => {
    //   if (cs.Comments) {
    //     cs.Comments.map((cId) => {
    //       if (cId.CommentCreatedBy != this.userId) {
    //         Ids.push(cId.CommentCreatedBy);
    //       }
    //     })
    //   }
    // });
    // let strIds = Ids.toString();
    // id, contactType, pageno, contactIds, userId
    this.caseLists.map(cs => {
      let invStr = cs.InviteeId.toString();
      invitIds.push(invStr);
    });
    // console.log(invitIds);
    this.caseManagementService.getMyContacts(this.gUid, 2, 1, null, this.userId)
      .subscribe(
        myContacts => {
          this.contactsLists = myContacts.Body.Data.Item;
        },
        error => console.log(error),
        () => {
          this.caseLists.map(cs =>
            cs.Comments ? cs.Comments.map((cId) => {
              cId.CommentCreatedByName =
                this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy) ? this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy).FirstName : null;
              cId.CommentCreatedByProfile =
                this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy) ? this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy).imagepath : null;
            }) : null
          )
        }
      );

  }

  //  Showing Invited conctact details on click of Invitees in the case details
  getInvitees(caseList) {
    this.inviteeCaseId = caseList.Id;
    let inviteeIDs = caseList.InviteeId;
    let contactDetails = [];
    if (inviteeIDs) {
      inviteeIDs.map(i => {
        contactDetails.push({ name: this.contactsLists.find(c => c.Id == i) ? this.contactsLists.find(c => c.Id == i).FirstName : null, imagePath: this.contactsLists.find(c => c.Id == i) ? this.contactsLists.find(c => c.Id == i).imagepath : null, Id: this.contactsLists.find(c => c.Id == i) ? this.contactsLists.find(c => c.Id == i).Id : null });
      })
    }

    caseList.isInviteeHide = true;
    inviteeIDs = contactDetails;
    this.inviteesList = inviteeIDs;
    caseList.isDoc = false;
    caseList.isDicomShow = false;
    caseList.isAppointment = false;
    console.log(this.inviteesList);
  }


  // Closing invited contact list
  closeInvitees(caseList) {
    caseList.isInviteeHide = false;
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

  onClickedOutside(e: Event) {
    console.log('Clicked outside:', e);
  }

  getDicomIds(event) {
    console.log(event.Header.Success);
    if (event.Header.Success) {
      this.getCaselist(1, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, null);
    }
    this.studyPkIds = event;
  }
  openDicom(caseList) {
    this.isAddDicom = true;
    this.caseToAddDciom = caseList;
  }
  getDateRange(evt) {
    // this.getCaselist(1, 'D', evt.fromDate, evt.endDate);
    this.caseTypeNew = this.caseTypeNew ? this.caseTypeNew : 1;
    this.getCaselist(this.caseTypeNew, this.userId, null, this.sortValue, null, null, null, null, null, evt.fromDate, null, 1, 10, null);
    // this.getCaselist(this.caseTypeNew, this.userId, null, this.sortValue, null, null, null, null, null, evt.fromDate, evt.endDate, 1, 10, null);
    console.log(this.caseTypeNew);
  }
  // Appointment related stuffs

  getAppointments(caseList) {
    this.appCaseId = caseList.Id;
    caseList.isAppointment = true;
    caseList.isDoc = false;
    caseList.isDicomShow = false;
    caseList.isInviteeHide = false;
    this.appointmentCase = caseList;
  }
  closeAppointment(evt) {
    evt.isAppointment = false;
  }

  getAppointmentCount(evt) {
    console.log(evt);
  }

  showAttachmentPopup(path, type, docType) {
    // if ()
    // let extn = docType.Doctype.substr(docType.Doctype.length - 4);
    // if (extn == "swps" || extn == "jpeg" || extn == "/png" || extn == "ript" || extn == "/gif") {
    //   $('#DicomImage-Popup').modal('show');
    //   this.attachmentObj.type = type;
    //   this.attachmentObj.attachmentPath = this.sanitizer.bypassSecurityTrustResourceUrl(path);
    // }
    // else {
    //   $('#DicomImage-Popup').modal('hide');
    //   this.attachmentObj.type = type;
    //   this.attachmentObj.attachmentPath = this.sanitizer.bypassSecurityTrustResourceUrl(path);
    // }
  }

  sortChange(selVal) {
    this.sortValue = selVal;
    this.getCaselist(this.caseTypeNew ? this.caseTypeNew : 1, this.userId, null, this.sortValue, null, null, null, null, null, null, null, 1, 10, this.appointmentStatus)
  }
  scrollDown() {
    console.log('scrolled!!');
    // this.getCaselist(1, this.userId, null, 'DESC', null, null, null, null, null, null, null, 1, 10, null);
    if (this.caseLists) {
      if (this.caseItems.TotalItemCount > this.caseLists.length) {
        let param = { status: this.caseTypeNew, userID: this.userId, inviteeId: null, sortBy: this.sortValue, appStTime: null, appEndTime: null, caseId: null, appointmentNumber: null, appointMentoption: null, fromDate: null, option: null, pageNo: this.caseItems.Page + 1, pageSize: 10, withAppointment: this.appointmentStatus }
        this.caseManagementService.getCaseList(param).subscribe(
          res => {
            let newList = res.Body.Data.Items
            let oldList = this.caseLists;
            this.caseLists = oldList.concat(newList);
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

  scrollDownComments(caseList) {
    if (this.commentsData.TotalItemCount > this.commentsDetails.length) {
      console.log('scrolled for  more comments');
      this.caseManagementService.getCommentsByCaseId(caseList.Id, (+this.commentsData.Page + 1), 10).subscribe(res => {
        let newCmtList = res.Body.Data.Items
        let oldCmtList = this.commentsDetails;
        this.commentsDetails = oldCmtList.concat(newCmtList);
        this.commentsData.Page = res.Body.Data.Page;
      })
    }
    else {
      console.log('end of scroll');
    }
  }

  viewAttachments(data) {
    console.log(data);
    let file = { FileName: data.FileName, Path: data.Path }
    this.caseManagementService.viewAttachments(file).subscribe(res => {
      console.log(res);
    })
  }
}
