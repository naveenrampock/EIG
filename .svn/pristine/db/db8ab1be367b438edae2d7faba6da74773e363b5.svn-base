import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CaseManagementService } from '../../case-management.service';
declare var $;

@Component({
  selector: 'app-add-dicom',
  templateUrl: './add-dicom.component.html',
  styleUrls: ['./add-dicom.component.css']
})
export class AddDicomComponent implements OnInit, AfterViewInit {
  totalCount: any;
  studyPkIds: Array<any> = [];
  dicomLists: any;
  userId = Cookie.get('Id');
  gUid = Cookie.get('userID');
  uType = Cookie.get('userType');
  isDicomServed: boolean = false;
  @Output() closeDicom: EventEmitter<any> = new EventEmitter();
  @Input() caseType;
  @Input() caseDicom;
  constructor(private caseManagementService: CaseManagementService) { }

  ngAfterViewInit() {
    // $('#Attach-Popup').modal('show');
  }

  ngOnInit() {
    this.getDicomList();
    console.log(this.caseType)

  }
  // getDicomList() {
  //   let pageNo = 1;
  //   let pageSize = 20;
  //   var userID = parseInt(this.userId);
  //   let data = { userId: userID, userType: this.uType, pageNumber: pageNo, pageSize: pageSize }
  //   // if (!this.isDicomServed) {
  //   this.caseManagementService.getDicomList(data)
  //     .subscribe((res) => {
  //       this.dicomLists = res.body.data.dicomList;
  //       // this.isDicomServed = true;
  //     })
  //   // }
  // }
  getDicomList() {
    console.log('this is called');
    let params = {
      studyPK: null,
      patientId: null,
      patientName: null,
      cStartDate: null,
      cEndDate: null,
      uStartDate: null,
      uEndDate: null,
      modality: null,
      userID: this.userId,
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
    this.caseManagementService.getDicomList(params)
      .subscribe((res) => {
        console.log(res);
        this.dicomLists = res.Body.Data.dicomList;
        this.totalCount = res.Body.Data.TotalItemCount;
      })
  }
  selectDicoms(evnt, StudyPk: any) {
    if (evnt) {
      this.studyPkIds.push(StudyPk);
      console.log(this.studyPkIds);
    } else {
      this.studyPkIds.splice(this.studyPkIds.indexOf(StudyPk), 1);
    }
  }

  sendStudyId() {
    console.log(this.caseType)
    this.closeDicom.emit(this.studyPkIds);
  }

  saveCaseDicomIdsToCase(dCaseId) {

    if (this.studyPkIds) {
      console.log('save');
      console.log(this.caseType, + 'see' + this.caseDicom)
      let dicomData = { caseId: this.caseDicom.Id, userID: this.userId, studyPkId: this.studyPkIds }
      this.caseManagementService.addCaseDicom(dicomData).subscribe(res => {
        this.closeDicom.emit(res);
        console.log(res);
      })
    }
  }
}
