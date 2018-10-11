import { Component, OnInit } from '@angular/core';
import { CaseManagementService } from '../../case-management.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CONFIG } from '../../../core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var $;


@Component({
  selector: 'app-invited-cases',
  templateUrl: './invited-cases.component.html',
  styleUrls: ['./invited-cases.component.css']
})
export class InvitedCasesComponent implements OnInit {
  vidyoConnector: any;
  commentsDetails: any;
  msgs: any[];
  invitedAptCase: any;
  inviAppCaseId: any;
  iAppointments: any;
  accountId: string;
  contactsLists: any;
  caseToAddDciom: any;
  isAddDicom: boolean;
  DicomCaseId: any;
  caseDocs: any;
  docCaseId: any;
  uploadedFiles: File[];
  invitedCaseDetails: any;
  isInvitedCase: boolean = false;
  userId = Cookie.get('Id');
  configUrl = CONFIG.url;
  gUid = Cookie.get('userID');
  profilePic = Cookie.get('profilePic');
  loadAPI: Promise<any>;
  addAttachmentList: any;
  attachmentList: Array<any> = [];
  insertAttachmentList: Array<any> = [];
  comments: any = '';
  docType: any;
  attachmentObj: { type: any, attachmentPath: SafeResourceUrl } = { type: '', attachmentPath: '' }
  caseDicomLists: any;
  uType = Cookie.get('userType');
  caseItems: any;
  commentsData: any;
  caseHideId: any;
  check: boolean = true;
  isDicomMore: boolean;
  dicomMoreInfo: any;
  commentsError: string;
  firstName: any;
  caseType = "PostedCase";
  constructor(private caseManagementService: CaseManagementService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getInvitedCaseDetails();
    this.firstName = Cookie.get('firstName');
    this.accountId = localStorage.getItem('accountId_ls');
  }
  // Get Invited case details
  getInvitedCaseDetails() {
    let pageNo = 1;
    let pageSize = 10;
    return this.caseManagementService.getIvnitedCaseDetails(this.userId, pageNo, pageSize).subscribe(
      res => {
        this.invitedCaseDetails = res.Body.Data.Items;
        this.caseItems = res.Body.Data;
      },
      error => console.error(error),
      () => this.mapContactInvitedCase()
    )
  }


  // getMyCaseList() {

  //   this.caseManagementService.getMyCaseList(this.userId)
  //     .subscribe((res) => {
  //       this.attachmentList = res.Body.Data.attachmentList;
  //       $("#invitedAttachmentList").modal('show');
  //     })
  // }

  getMyCaseList(caseList) {
    this.caseManagementService.getMyCaseList(this.userId)
      .subscribe((res) => {
        this.attachmentList = [];
        let docIds = caseList.CaseDocumentsList ? caseList.CaseDocumentsList.split(',') : caseList.CaseDocumentsList;
        this.attachmentList = res.Body.Data.attachmentList;
        if (docIds) {
          for (var i = 0; i < this.attachmentList.length; i++) {
            docIds.map(dId => {
              if (this.attachmentList[i].Id == dId) {
                console.log(this.attachmentList[i].Id);
                this.attachmentList[i].isChecked = true;
                this.attachmentList[i].isDisabled = true;
              }
            })
          }
        }
        $("#invitedAttachmentList").modal('show');
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
        this.getInvitedCaseDetails();
        this.insertAttachmentList = [];


      })
  }

  // addComment(caseList) {
  //   console.log(caseList);
  //   if (caseList.comment.trim() !== '') {
  //     let comments = { caseId: caseList.Id, comment: caseList.comment, uId: this.userId }
  //     this.caseManagementService.addComments(comments).subscribe(com => {
  //       if (com.Header.Success) {
  //         // this.showSuccess(com.message);
  //         caseList.comment = '';
  //         if (this.invitedCaseDetails) {
  //           this.invitedCaseDetails.map(i => {
  //             com.Body.Data.Items.map(e => {
  //               if (i.Id == e.CaseId) {
  //                 i.Comments = com.Body.Data.Items;
  //               }
  //             })
  //           });
  //           this.mapContactInvitedCase();
  //         }
  //       }
  //     });
  //   }
  // }
  // scrollDownComments(caseList) {
  //   if (this.commentsData.TotalItemCount > this.commentsDetails.length) {
  //     console.log('scrolled for  more comments');
  //     this.caseManagementService.getCommentsByCaseId(caseList.Id, (+this.commentsData.Page + 1), 10).subscribe(res => {
  //       let newCmtList = res.Body.Data.Items
  //       let oldCmtList = this.commentsDetails;
  //       this.commentsDetails = oldCmtList.concat(newCmtList);
  //       this.commentsData.Page = res.Body.Data.Page;
  //     })
  //   }
  //   else {
  //     console.log('end of scroll');
  //   }
  // }
  scrollDownComments(caseList) {
    console.log('scrolled for comments');
    if (this.commentsData.TotalItemCount > this.commentsDetails.length) {
      this.caseManagementService.getCommentsByCaseId(caseList.Id, (+this.commentsData.Page + 1), 10).subscribe(res => {
        if (this.invitedCaseDetails) {
          let newCmtList = res.Body.Data.Items
          let oldCmtList = this.commentsDetails;
          this.commentsDetails = oldCmtList.concat(newCmtList);
          console.log(this.commentsDetails);
          this.commentsData.Page = res.Body.Data.Page;
          this.commentsData.TotalItemCount = res.Body.Data.TotalItemCount;
          this.invitedCaseDetails.map(i => {
            res.Body.Data.Items.map(e => {
              if (i.Id == e.CaseId) {
                i.Comments = this.commentsDetails;
              }
            })
          });
          this.mapContactInvitedCase();
        }
      })
    }
  }

  hideComments(caseList) {
    caseList.isMore = false;
  }

  getComments(caseList) {
    let pageNo = 1;
    let pageSize = 10;
    caseList.isMore = true;
    this.caseHideId = caseList.Id;
    this.caseManagementService.getCommentsByCaseId(caseList.Id, pageNo, pageSize).subscribe(res => {
      this.commentsDetails = res.Body.Data.Items;
      this.commentsData = res.Body.Data;
      if (this.invitedCaseDetails) {
        res.Body.Data.Items.map(e => {
          if (caseList.Id == e.CaseId) {
            caseList.Comments = res.Body.Data.Items;
          }
        })
        this.mapContactInvitedCase();
      }
    })
  }
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
            if (caseList) {

              let addComments = { CommentId: com.Body.Data.commentId, Comment: caseList.comment, CommentCreatedBy: this.userId, CommentCreatedDate: new Date(Date.now()), CommentCreatedByName: null, CommentCreatedByProfile: null }
              caseList.Comments.push(addComments);
              console.log(caseList.Comments);
            }
            caseList.comment = '';
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
    console.log(caseId);
    console.log(eComment);
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

  // Show toast messages for Errors
  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: msg });
  }
  // Adding contactname and profile pic to the comments
  mapContactInvitedCase() {
    this.caseManagementService.getMyContacts(this.gUid, 2, 1, null, this.userId)
      .subscribe(
        contacts => {
          this.contactsLists = contacts.Body.Data.Item;
        },
        error => { console.error(); },
        () => {
          this.invitedCaseDetails.map((cs) => {
            cs.CaseCreatedByName = this.contactsLists.find(cont => cont.Id == cs.CaseCreatedBy) ? this.contactsLists.find(cont => cont.Id == cs.CaseCreatedBy).FirstName : null;
            cs.CaseCreatedByProfile = this.contactsLists.find(cont => cont.Id == cs.CaseCreatedBy) ? this.contactsLists.find(cont => cont.Id == cs.CaseCreatedBy).imagepath : null
            cs.Comments ? cs.Comments.map((cId) => {
              cId.CommentCreatedByName =
                this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy) ? this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy).FirstName : null;
              cId.CommentCreatedByProfile =
                this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy) ? this.contactsLists.find(cont => cont.Id == cId.CommentCreatedBy).imagepath : null;
            }) : null;

            console.log(cs.CaseCreatedByName + 'cr name');
            if (cs.CaseCreatedByName) {
              cs = null;
            }
            console.log(this.invitedCaseDetails);
          });
        }
      )
  }

  //Adding attachments to the case
  // onUploadFile(event, caseList) {
  //   this.uploadedFiles = <Array<File>>event.target.files;
  //   this.callFileUpload(caseList);
  // }

  // //Adding attachments to the case
  // callFileUpload(caseList) {
  //   const formData: any = new FormData();
  //   const files: Array<File> = this.uploadedFiles;
  //   console.log(files);
  //   this.caseManagementService.caseFileUpload(files, this.userId, caseList.Id,'').subscribe(
  //     res => {
  //       if (res.success) {
  //         // this.caseDocs.push({})
  //         // this.showSuccess(res.message);
  //         this.getDocumentsBy(caseList);
  //       }
  //     },
  //     error => console.error('Error in uploading an Attachment'),
  //     () => {
  //       this.invitedCaseDetails.map(res => {
  //         if (res.Id == caseList.Id) {
  //           console.log(res.CaseDocuments);
  //           ++res.CaseDocuments;
  //         }
  //       })
  //     })
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
    this.caseManagementService.caseFileUpload(files, this.userId, caseList.Id, this.comments).subscribe(
      res => {
        if (res.success) {
          // this.caseDocs.push({})
          this.showSuccess(res.message);

        }
      },
      error => console.error('Error in uploading an Attachment'),
      () => {
        this.comments = '';
        // this.invitedCaseDetails.map(res => {
        //   if (res.Id == caseList.Id) {
        //     ++res.CaseDocuments;
        //   }
        // })
      }

    )
  }

  // Get Documents by caseId
  // getDocumentsBy(caseList, doctype) {
  //   this.caseDocs = [];
  //   this.docType = doctype;
  //   this.addAttachmentList = caseList;
  //   this.docCaseId = caseList.Id;
  //   if (caseList.CaseDocumentsList) {
  //     this.caseManagementService.getDocumentsByDocId(caseList.CaseDocumentsList).subscribe(res => {
  //       this.caseDocs = res.Body.Data.attachmentList;
  //     })
  //   } else {
  //     console.log("No Records Found");
  //   }

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

  // Hide atttachments div on click of close button
  hideAttachments(caseList) {
    caseList.isDoc = false;
  }
  hideDicomAttach(caseList) {
    caseList.isDicomShow = false;
  }
  // Deleting Docs by DocId
  deleteDocBy(caseList, doc) {
    console.log(doc);
    this.caseManagementService.deleteCaseDocBy(doc.DocId).subscribe(res => {
      // this.caseDocs = res.Body.Data;
      this.caseDocs.splice(this.caseDocs.indexOf(doc), 1);
    },
      error => console.error('Error in Deleting an attachment'),
      () => {
        --caseList.CaseDocuments;
        caseList.Documents.splice(caseList.Documents.indexOf(doc), 1);
        console.log(caseList.Documents);
      }
    )
  }

  viewDicom(dicom) {
    console.log(dicom);
  }
  dicomDetails(dicom) {
    this.isDicomMore = true;
    this.dicomMoreInfo = dicom;
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

  openDicom(caseList) {
    this.isAddDicom = true;
    this.caseToAddDciom = caseList;

  }
  getAppointmentsBy(invCase) {
    console.log(invCase);
    this.inviAppCaseId = invCase.Id;
    invCase.isAppointment = true;
    invCase.isDoc = false;
    invCase.isDicomShow = false; this.invitedAptCase = invCase;
  }

  closeInAppointment(evt) {
    console.log(evt);
    evt.isAppointment = false;
  }
  // Delete comments by caseId and and comment Id
  deleteComment(delcmmnt, caseList) {
    let delBody = { commentId: delcmmnt.Id | delcmmnt.CommentId }
    this.caseManagementService.deleteComments(delBody).subscribe(res => {
      // this.commentsDetails = res.Body.Data;
      if (res.Header.Success) {
        caseList.Comments.splice(caseList.Comments.indexOf(delcmmnt), 1);
        //for invited case list
        // if (this.invitedCaseDetails) {
        //   this.invitedCaseDetails.map(c => {
        //     if (res.Body.Data.length > 0) {
        //       res.Body.Data.map(e => {
        //         if (c.Id == e.CaseId) {
        //           c.Comments = res.Body.Data;
        //         }
        //       })
        //     } else {
        //       c.Comments = res.Body.Data;
        //     }
        //   });
        //   this.mapContactInvitedCase();
        // }
      }
    })
  }
  toggleDesc(caseList) {
    caseList.isCaseDesc = !caseList.isCaseDesc;
  }
  showAttachmentPopup(path, type) {
    $('#DicomImage-Popup').modal('show');
    this.attachmentObj.type = type;
    this.attachmentObj.attachmentPath = this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
  scrollDown() {
    console.log('scrolled!!');
    if (this.caseItems.TotalItemCount > this.invitedCaseDetails.length) {
      this.caseManagementService.getIvnitedCaseDetails(this.userId, this.caseItems.Page + 1, 10).subscribe(
        res => {
          let newList = res.Body.Data.Items
          let oldList = this.invitedCaseDetails;
          this.invitedCaseDetails = oldList.concat(newList);
          console.log(this.invitedCaseDetails);
          this.invitedCaseDetails.Page = res.Body.Data.Page;
          // this.contactsLists = contacts.Body.Data.Item;
        },
        error => {
          console.log(error)
        },
        () => {
          // pageNo += 1;
          this.mapContactInvitedCase();
        })
    } else {
      console.log('End of data');
    }
  }
}
