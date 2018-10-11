import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DicomService } from './dicom.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';

declare var $;
@Component({
  selector: 'app-dicom',
  templateUrl: './dicom.component.html',
  styleUrls: ['./dicom.component.css']
})
export class DicomComponent implements OnInit {
  moreInfo: any;
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  uploadedFiles: Array<any> = [];
  filesToUpload: Array<File> = [];
  display: boolean = false;
  userlistDisplay: boolean = false;
  more: boolean = false;
  instanceId: any;
  studyId: any;
  series: any;
  image: any;
  dicomList: Array<any> = [];
  userList: Array<any> = [];
  radio: boolean = false;
  checkbox: boolean = false;
  private contactId: any;
  private getStudyPk: any;
  private checkboxInvitee: Array<any> = [];
  private uploadId: any;
  cUploader: boolean = false;
  msgs: Message[] = [];
  totalRecords: any;
  pageNo: number = 1;
  sUrl: any;
  private folderUpload: any;
  hideFile: boolean = true;
  hideFolder: boolean = false;
  modality: any;
  modValue: Array<any> = [];
  bodyParts: Array<any> = [];
  bodyPartsValue: Array<any> = [];


  advanceSearch: FormGroup;
  public lang: any;
  public fm: string = "yy-mm-dd";
  public minDate: Date;
  serverId: any;
  public contactsLabel: any;
  public totalCount: number;
  contactListItems: any;
  uploadedBy: Array<any> = [];
  ownedBy: Array<any> = [];
  sharedTo: Array<any> = [];
  noOwnerFlag: boolean = false;
  selectedRadio: any;
  press: boolean = false;
  alpha: string = ''
  public EminDate: Date;
  public UminDate: Date;
  _validFileExtensions = ["application/pdf", "image/png", "image/jpg",
    "image/jpeg", "image/bmp", "image/gif", "image/png", "image/svg", "image/txt", "image/bmp",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  // public LastMenstrualCycleDt:any;
  srcUrl: any;
  success: boolean = false;
  results: Array<any> = [];
  uploaded: any;
  shared: any;
  owner: any;
  Disabled: boolean = false;
  private assignOwnerName:any;
  constructor(private dicom: DicomService, private router: Router, private _FB: FormBuilder, private sanitizer: DomSanitizer) {



  }

  ngOnInit() {
    this.minDate = new Date();
    this.modality = [{ name: 'DR/CR/DX' }, { name: 'US' },
    { name: 'NM' }, { name: 'RF' }, { name: 'SC' },
    { name: 'MR' }, { name: 'PT' }, { name: 'SR' }, { name: 'CT' }, { name: 'MG' }, { name: 'XA' }, { name: 'OT' }]
    // this.getDicomList();
    this.bodyParts = [{ name: 'SKULL' }, { name: 'CSPINE' }, { name: 'TSPINE' }, { name: 'LSPINE' }, { name: 'SSPINE' }, { name: 'COCCYX' }, { name: 'CHEST' }, { name: 'CLAVICLE' }, { name: 'BREAST' }, { name: 'ABDOMEN' }, { name: 'PELVIS' }, { name: 'ABDOMEN' }, { name: 'SHOULDER' }, { name: 'HIP' }, { name: 'ELBOW' }, { name: 'KNEE' }, { name: 'ANKLE' }, { name: 'HAND' }, { name: 'FOOT' }, { name: 'EXTREMITY' }, { name: 'HEAD' }, { name: 'HEART' }, { name: 'NECK' }, { name: 'LEG' }, { name: 'ARM' }, { name: 'JAW' }]
    this.getContacts();

    this.search();
    this.calenderData();
    this.advanceSearch.get('cStartDate').valueChanges.subscribe((val) => {
      this.EminDate = this.advanceSearch.get('cStartDate').value;
      console.log("emin", this.EminDate)
    });
    this.advanceSearch.get('uStartDate').valueChanges.subscribe((r) => {
      this.UminDate = this.advanceSearch.get('uStartDate').value;

    })

    // this.advanceSearch.get('uploadedBy').valueChanges.subscribe((res)=>{
    //   console.log(res)
    // })
  }

  checkLenth1(evt) {
    switch (evt) {
      case 1: this.advanceSearch.patchValue({
        uploadedBy: ''
      });
        break;
      case 2: this.advanceSearch.patchValue({
        ownedBy: ''
      });
        break;
      case 3: this.advanceSearch.patchValue({
        sharedTo: ''
      });
        break;
    }
  }

  private calenderData() {
    this.lang = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Пон", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  }


  public focus(evt) {
    if (this.fm == "yy.mm.dd") {
      this.fm = "yy-mm-dd";
      setTimeout(() => {
        evt.target.value = evt.target.value.replace(/\./g, "-");
      });
    }
    else if (this.fm == "yy/mm/dd") {
      this.fm = "yy-mm-dd";
      setTimeout(() => {
        evt.target.value = evt.target.value.replace(/\//g, "-");

      });
    }
  }

  public cal(evt) {
    if (evt.indexOf("/") > -1) {
      this.fm = "yy/mm/dd";
    } else if (evt.indexOf(".") > -1) {
      this.fm = "yy.mm.dd";
    } else if (evt.indexOf("-") > -1) { this.fm = "yy-mm-dd" }

  }

  modalityValue(evt, val) {
    if (evt) {
      this.modValue.push(val)
      this.advanceSearch.patchValue({
        modality: this.modValue.toString() ? this.modValue.toString() : null
      });
    } else {
      this.modValue.splice(this.modValue.indexOf(val), 1);
      this.advanceSearch.patchValue({
        modality: this.modValue.toString() ? this.modValue.toString() : null
      });
    }
  }

  bodyValue(evt, val) {
    if (evt) {
      this.bodyPartsValue.push(val)
      this.advanceSearch.patchValue({
        bodyParts: this.bodyPartsValue.toString() ? this.bodyPartsValue.toString() : null
      });
    } else {
      this.bodyPartsValue.splice(this.bodyPartsValue.indexOf(val), 1);
      this.advanceSearch.patchValue({
        bodyParts: this.bodyPartsValue.toString() ? this.bodyPartsValue.toString() : null
      });
    }
  }


  search() {

    this.advanceSearch = this._FB.group({
      shareByothers: [null],
      myImage: [null],
      myUpload: [null],
      studyId: [null],
      patientId: [null],
      patientName: [null],
      cStartDate: [null],
      cEndDate: [null],
      uStartDate: [null],
      uEndDate: [null],
      modality: [null],
      bodyParts: [null],
      userId: [null],
      pageNumber: [1],
      pageSize: [10],
      studyPK: [null],
      studyUId: [null],
      uploadedBy: [null],
      ownedBy: [null],
      sharedTo: [null],
      hospitalName: [null],
      userType: [this.uType]

    })
    this.getDicomList();
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  getDicomList() {
    console.log(this.advanceSearch.value);
    let data = this.advanceSearch.value;

    data.studyId = data.studyId ? data.studyId : null;
    data.cStartDate = new DatePipe('en').transform(data.cStartDate, 'yyyy-MM-dd');
    data.cEndDate = new DatePipe('en').transform(data.cEndDate, 'yyyy-MM-dd');
    data.uStartDate = new DatePipe('en').transform(data.uStartDate, 'yyyy-MM-dd');
    data.uEndDate = new DatePipe('en').transform(data.uEndDate, 'yyyy-MM-dd');

    this.dicom.getDicomList(this.advanceSearch.value)
      .subscribe((res) => {
        console.log(res);
       
        this.dicomList = res.Body.Data.dicomList;
        this.totalCount = res.Body.Data.TotalItemCount;
        this.press = false;
      })
  }

  deleteDicom(del) {
    console.log(del)
    this.dicom.delDicom(del)
      .subscribe((res) => {
        this.showSuccess(res.Header.message);
        this.getDicomList();
        console.log(res);
      })
  }



  getStudyId(sPk, status, owner) {
    this.getStudyPk = sPk;
    console.log(status, owner)
    if (status == "assign") {
      this.radio = true;
      this.checkbox = false;
      this.contactsLabel = "Assign Owner";
      // this.getContacts();
      // if (owner) {
      console.log("if", this.noOwnerFlag)
      this.selectedRadio = owner;
      // if(this.noOwnerFlag){
      //   console.log("false")
      //   this.userList.forEach(i=>i.isChecked=false);
      // }else{
      //  this.userList.find(f => f.Id == owner) ? this.userList.find(f => f.Id == owner).isChecked = true : this.userList.find(f => f.Id == owner).isChecked = false;
      // }
      // }else{
      //   console.log("else", this.userList)
      //   this.userList.forEach(f => f.isChecked = false)
      // }

    }
    else if (status == 'cUploader') {

      this.radio = true;
      this.checkbox = false;
      // this.cUploader=true;
      this.contactsLabel = "Change Uploader"
      this.selectedRadio = owner;
      // this.userList.map(i=>i.isChecked=false)
    }
    else if (status == 'share') {
      this.radio = false;
      this.checkbox = true;
      // this.cUploader=false;
      this.contactsLabel = "Share Dicom"
      this.getSharedIds(sPk);
    }
  }

  selectInvitee(contact) {
    this.contactId = contact.Id;
    this.assignOwnerName= contact.FirstName+' '+contact.LastName
  }

  selectCheckboxInvitee(evt, contact) {
    contact.isChecked = evt;
    console.log(contact)
    if (evt) {
      this.checkboxInvitee.push(contact.Id);
      console.log(this.checkboxInvitee);
    } else {
      this.checkboxInvitee.splice(this.checkboxInvitee.indexOf(contact.Id), 1);
      console.log(this.checkboxInvitee);
    }
  }

  shareDicom() {
    let data = { userId: this.id, studyPk: this.getStudyPk, invitees: this.checkboxInvitee.toString() }
    this.dicom.shareDicom(data)
      .subscribe((res) => {
        console.log(res);
        this.showSuccess(res.Header.message);
        $('#dicomUser').modal('hide');
        this.getDicomList();
      })
  }

  assignDicom() {
    let data = { "userId": this.contactId, "studyPkId": this.getStudyPk,ownerName:this.assignOwnerName };
    console.log(data)
    this.dicom.assignDicom(data)
      .subscribe((res) => {
        this.showSuccess(res.Header.message);
        $('#dicomUser').modal('hide');
        this.getDicomList();
        console.log(res)
      })
  }

  changeUPloader() {
    let data = { userId: this.contactId, updatedBy: this.id, studyPk: this.getStudyPk,ownerName:this.assignOwnerName }
    this.dicom.changeUploader(data)
      .subscribe((res) => {
        this.showSuccess(res.Header.message);
        $('#dicomUser').modal('hide');
        console.log(res)
      })
  }

  getContacts() {
    this.dicom.getMyContacts(this.uID, 0, 10, 1, this.id)
      .subscribe((res) => {
        this.userList = res.Body.Data.Item;
        this.contactListItems = res.Body.Data;
        console.log(res);

      })
  }

  showUserList() {
    this.userlistDisplay = true;

  }

  showError(msg) {

    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }

  filesPicked(files) {
    this.folderUpload = [];
    for (let i = 0; i < files.length; i++) {
      this.folderUpload.push(files[i]);

    }
    console.log(files);

    //  this.upload(files);
  }

  saveFolder() {
    if (this.folderUpload.some(f => this._validFileExtensions.indexOf(f.type) != -1)) {
      console.log(`Invalid file Added )`);
      this.showError('Invalid file Added');
    } else {
      console.log('success');
      this.upload(this.folderUpload, '');
    }

  }

  upload(evt, form) {
    this.dicom.uploadFile(evt, this.id, Cookie.get('accountID'))
      .subscribe((response) => {
        this.filesToUpload = [];
        //  console.log(response.Data[0]);
        this.instanceId = response.Body.Data.StudyInstanceId;
        // console.log(response.Data[0].StudyInstanceId.split(','))
        this.studyId = response.Body.Data.StudyId;
        this.series = response.Body.Data.NoOfSeries;
        this.image = response.Body.Data.NoOfImages;
        this.uploadId = response.Body.Data.Id;
        this.sUrl = response.Body.serverUrl;
        this.serverId = response.Body.serverId
        // form.clear()
        this.display = true;
      })
  }

  fileChangeEvent(fileInput: any, form) {

    console.log(fileInput);

    if (fileInput.files.some(f => this._validFileExtensions.indexOf(f.type) != -1)) {
      console.log(`Invalid file Added `);
      this.showError('Invalid file Added');
    } else {
      console.log('success');

      console.log("#form", form)
      this.upload(fileInput.files, form)
    }

  }

  radioFile(evt) {
    if (evt == 1) {
      this.hideFile = true;
      this.hideFolder = false;
    } else {
      this.hideFile = false;
      this.hideFolder = true;
    }

  }


  moveToS3() {
    this.display = false;
    this.dicom.moveToS3Upload(this.instanceId, this.uploadId, this.sUrl, this.serverId)
      .subscribe((res) => {
        this.showSuccess(res.Header.message)
        console.log(res.Header.message);
        this.display = false;
        this.getDicomList();

      })
  }

  loadLazy(LazyLoadEvent) {

    this.pageNo = (LazyLoadEvent.first + 10) / 10;
    this.advanceSearch.patchValue({
      pageNumber: this.pageNo
    });
    this.getDicomList();

  }

  removeDicon() {
    this.dicom.rejectDicom(this.instanceId, this.uploadId, this.sUrl)
      .subscribe((res) => {
        this.showSuccess(res.Header.message);
        console.log("deleted ")
      })
  }

  abnormalStatus(status) {
    this.dicom.abnormalStatus(status)
      .subscribe((res) => {
        this.dicomList = res.Body.Data.dicomList;
        this.totalCount = res.Body.Data.TotalItemCount;
        if (status == 2) {
          this.Disabled = true
        }
        else {
          this.Disabled = false;
        }
        this.press = true;
        this.userList.forEach(i => i.isChecked = false)
        status = '2' ? this.noOwnerFlag = true : this.noOwnerFlag = false
        console.log(this.userList);
       


      })
  }

  moreData(data) {
    this.more = true;
    this.moreInfo = data;
  }

  dicomViewer(instanceId, storageId) {
    const data = { studyInstanceId: this.id + "_" + instanceId, storageId: storageId }
    this.dicom.dicomViewer(data)
      .subscribe((res) => {
        this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.Body.Data.url);
        this.success = true;
      }, (error) => {
        console.log("Error")
        this.success = false;

      })
  }

  scrollDown() {
    console.log('scrolled!!');
    if (this.contactListItems.TotalItemCount > this.userList.length) {
      this.dicom.getMyContacts(this.uID, 0, 10, +this.contactListItems.Page + 1, this.id)
        .subscribe((res) => {
          // this.userList = res.Body.Data.Item;
          console.log(res)
          let newList = res.Body.Data.Item;

          let oldList = this.userList;
          // if(newList){
          this.userList = oldList.concat(newList);

          // }



          this.contactListItems.Page = res.Body.Data.Page;
          // this.contactsLists = contacts.Body.Data.Item;
        });
    } else {
      console.log('End of data');
    }
  }

  getSharedIds(sPk) {
    this.checkboxInvitee = [];
    this.dicom.getSharedIDs(sPk)
      .subscribe((res) => {
        console.log(res);
        const inviteeIds = res.Body.Data.share ? res.Body.Data.share.Invitees.split(",") : [];
        console.log(res, inviteeIds, this.userList);


        this.userList = this.userList.map(r => {
          r.isChecked = false;
          r.isDisabled = false;
          inviteeIds.forEach(i => {
            if (i == r.Id) {
              r.isChecked = true;
              r.isDisabled = true;
            }
          });
          return r;
        })
      })
  }

  filter(evt, to) {
    console.log(evt.query.length)
    if (evt.query.length) {
      switch (to) {
        case 1:
          console.log("empty")
          this.advanceSearch.patchValue({
            uploadedBy: null
          });

          break;
        case 2:
          this.advanceSearch.patchValue({
            ownedBy: null
          });

          break;
        case 3:

          this.advanceSearch.patchValue({
            sharedTo: null
          });

          break;

      }
    }
    this.dicom.getSingleUser(evt.query)
      .subscribe((res) => {
        setTimeout(() => {
          console.log(res.Body.Data)
          switch (to) {
            case 1: this.uploadedBy = res.Body.Data;
              break;
            case 2: this.ownedBy = res.Body.Data;
              break;
            case 3: this.sharedTo = res.Body.Data;
              break;
          }

        }, 100);
      })
  }

  handleDropdown(event, to) {

    switch (to) {
      case 1: this.advanceSearch.patchValue({
        uploadedBy: event.Id
      });
        break;
      case 2: this.advanceSearch.patchValue({
        ownedBy: event.Id
      });
        break;
      case 3: this.advanceSearch.patchValue({
        sharedTo: event.Id
      });
        break;
    }

    //event.query = current value in input field
    console.log(event)
  }
  searchCheck(evt) {
    console.log(evt)
    evt.length > 0 ? this.press = true : setTimeout(() => { this.press = false }, 400);
    console.log(this.alpha)
  }

  reset() {
    
    this.modality.map(r => r.isChecked = false);
    this.bodyParts.map(b=> b.isChecked = false);
    this.press = false;
    this.uploaded = null;
    this.owner = null;
    this.shared = null
    this.advanceSearch.patchValue({
      shareByothers: null,
      myImage: null,
      myUpload: null,
      studyId: null,
      patientId: null,
      patientName: null,
      cStartDate: null,
      cEndDate: null,
      uStartDate: null,
      uEndDate: null,
      modality: null,
      bodyParts: null,
      userId: null,
      pageNumber: 1,
      pageSize: 10,
      studyPK: null,
      studyUId: null,
      uploadedBy: null,
      ownedBy: null,
      sharedTo: null,
      hospitalName: null,
      userType: this.uType
    })
  
    this.getDicomList(); 

  }

}
