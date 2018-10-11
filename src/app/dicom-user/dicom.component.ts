import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DicomService } from './dicom.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
// import { NgProgress } from 'ngx-progressbar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { ToastService } from '../core/toast/toast';
import { ProgressServiceService } from '../core/progress-bar/progress';
import { concat } from 'lodash';
declare var $;


declare var $;
@Component({
  selector: 'app-dicom',
  templateUrl: './dicom.component.html',
  styleUrls: ['./dicom.component.css']
})
export class DicomComponent implements OnInit {


  clear: any;
  contactListItems: any;
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
  advanceSearch: FormGroup;
  public lang: any;
  public fm: string = "yy-mm-dd";
  public EminDate: Date;
  public UminDate: Date;
  serverId: any;
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  public header: any;
  // progressService:any;
  public totalCount: number;
  public contactsLabel: any;
  _validFileExtensions = ["application/pdf", "image/png", "image/jpg",
    "image/jpeg", "image/bmp", "image/gif", "image/png", "image/svg", "image/txt", "image/bmp", "application/ppt",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", 'application/msword', 'application/x-msdownload', 'text/xml'];
  // public LastMenstrualCycleDt:any;
  selectedRadio: any;
  srcUrl: any;
  success: boolean = false;
  process: Number = 0;
  radioReset:boolean=false;
  folderuploadDisabled:boolean=false;
  // dicomPopup:boolean=true;
  // processPopUp:boolean=true;


  uploadProgress: any;
  progress: boolean = false;
  private assignOwnerName:any;
  public ownerName:any;

  uploadDisabled:boolean=false;
  viewerUrl: any;
  constructor(private dicom: DicomService, private router: Router, private sanitizer: DomSanitizer,
    private _FB: FormBuilder, private toastService: ToastService,
    private progressService: ProgressServiceService) { }

  ngOnInit() {
    // this.minDate = new Date();
    this.modality = [{ name: 'DR/CR/DX' }, { name: 'US' },
    { name: 'NM' }, { name: 'RF' }, { name: 'SC' },
    { name: 'MR' }, { name: 'PT' }, { name: 'SR' }, { name: 'CT' }, { name: 'MG' }, { name: 'XA' }, { name: 'OT' }]
    // this.getDicomList();
    this.getContacts();
    // this.userList=[{"name":"pruthvi"},{"name":"pradeep"}]
    this.search();
    this.calenderData();
    this.advanceSearch.get('cStartDate').valueChanges.subscribe((val) => {
      this.EminDate = this.advanceSearch.get('cStartDate').value;
      console.log("emin", this.EminDate)
    });
    this.advanceSearch.get('uStartDate').valueChanges.subscribe((r) => {
      this.UminDate = this.advanceSearch.get('uStartDate').value;

    })
    this.checkFileProcess();
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


  search() {

    this.advanceSearch = this._FB.group({
      // shareByothers: [null],
      myuploadImage: [null],
      // myUpload: [null],
      studyId: [null],
      patientId: [null],
      patientName: [null],
      cStartDate: [null],
      cEndDate: [null],
      uStartDate: [null],
      uEndDate: [null],
      modality: [null],
      bodyParts: [null],
      userId: [this.id],
      pageNumber: [''],
      uploadedBy: [null],
      ownedBy: [null],
      sharedTo: [null],
      paramHospitalName: [null],
      studyPK: [null],
      studyUId: [null],
      pageSize: [10],
      userType: [this.uType]
    })
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  getDicomList() {
    // let pageNo = 1;
    //   let pageSize = 10;
    // var userID = parseInt(this.id);
    //  let data = { userId: userID, userType: this.uType, pageNumber: this.pageNo, pageSize: pageSize }
    let data = this.advanceSearch.value;
    data.shareByothers = data.myuploadImage == 'share' ? this.id : null;
    data.myUpload = data.myuploadImage == 'mUload' ? this.id : null;
    data.myImage = data.myuploadImage == 'mImage' ? this.id : null;
    data.studyId = data.studyId ? data.studyId : null;
    data.cStartDate = new DatePipe('en').transform(data.cStartDate, 'yyyy-MM-dd');
    data.cEndDate = new DatePipe('en').transform(data.cEndDate, 'yyyy-MM-dd');
    data.uStartDate = new DatePipe('en').transform(data.uStartDate, 'yyyy-MM-dd');
    data.uEndDate = new DatePipe('en').transform(data.uEndDate, 'yyyy-MM-dd');

    delete data.myuploadImage;
    console.log(data);
    this.dicom.getDicomList(this.advanceSearch.value)
      .subscribe((res) => {
        console.log(res);
        this.dicomList = res.Body.Data.dicomList;
        this.totalCount = res.Body.Data.TotalItemCount;
        this.ownerName=Cookie.get('firstName')+' '+Cookie.get('lastName')



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
      this.selectedRadio = owner;
      // if (owner) {
      //   this.userList.find(f => f.Id == owner) ? this.userList.find(f => f.Id == owner).isChecked = true : '';
      // }

    }
    else if (status == 'cUploader') {
      this.radio = true;
      this.checkbox = false;
      // this.cUploader=true;
      this.contactsLabel = "Change Uploader";
      this.selectedRadio = owner;
    }
    else if (status == 'share') {
      this.checkbox = true;
      this.radio = false;
      // this.cUploader=false;
      this.contactsLabel = "Share Dicom"
      $("#dicomUser").show();
      this.getSharedIds(sPk);
    }
  }



  selectInvitee(contact) {
    this.contactId = contact.Id;
    this.assignOwnerName= contact.FirstName+' '+contact.LastName
  }

  selectCheckboxInvitee(evt, id) {
    if (evt) {
      this.checkboxInvitee.push(id);
      console.log(this.checkboxInvitee);
    } else {
      this.checkboxInvitee.splice(this.checkboxInvitee.indexOf(id), 1);
      console.log(this.checkboxInvitee);
    }
  }

  shareDicom() {
    let data = { userId: this.id, studyPk: this.getStudyPk, invitees: this.checkboxInvitee.toString() }
    this.dicom.shareDicom(data)
      .subscribe((res) => {
        console.log(res);
        $('#dicomUser').modal('hide');
        this.showSuccess(res.Header.message);

        this.getDicomList();
      })
  }

  assignDicom(contact) {
    let data = { "userId": this.contactId, "studyPkId": this.getStudyPk,ownerName:this.assignOwnerName };
    console.log(data)
    this.dicom.assignDicom(data)
      .subscribe((res) => {
        $('#dicomUser').modal('hide');
        this.showSuccess(res.Header.message);

        console.log(res)
      })
  }

  changeUPloader() {
    let data = { userId: this.contactId, updatedBy: this.id, studyPk: this.getStudyPk }
    this.dicom.changeUploader(data)
      .subscribe((res) => {
        $('#dicomUser').modal('hide');
        this.showSuccess(res.Header.message);

        console.log(res)
      })
  }


  getContacts() {
    this.dicom.getMyContacts(this.uID, 2, 10, 1, this.id)
      .subscribe((res) => {
        this.userList = res.Body.Data.Item;
        this.contactListItems = res.Body.Data;
        console.log(res)
        //     this.dicomList.map(res=>{ 
        //  var a=  this.userList.find(f=> f.Id == res.Owner);

        //    console.log(a)
        //     } )
      })
  }

  getUserList(ids, StudyPk) {

    this.dicom.getUserList(ids)
      .subscribe((res) => {
        this.userList = res.Body.Data;
        this.contactListItems = res.Body.Data;

        console.log(res);
      })
  }

  showUserList() {
    this.userlistDisplay = true;

  }

  filesPicked(files) {
    this.folderUpload = [];
    for (let i = 0; i < files.length; i++) {
      this.folderUpload.push(files[i]);

    }
    console.log(files);

    //  this.upload(files);
  }

  showError(msg) {

    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }

  saveFolder() {
    if (this.folderUpload.some(f => this._validFileExtensions.indexOf(f.type) != -1)) {
      console.log(`Invalid file Added `);
      this.showError("Invalid file Added")
    } else {
      console.log('success');
      this.upload(this.folderUpload, '');
    }

  }
  toggleMenu() {
    $("#wrapper").toggleClass("active");
    this.toggle.emit(this.header);
  }

  checkFileProcess() {
    this.dicom.checkFileProcess(this.id)
      .subscribe((res) => {
        this.process = res.Body.Data.status;
        // var clear;
        console.log("pr", this.process)

        if(res.Body.Data.uploadStatus==false){
          if(res.Body.Data.StudyInstanceId){
          this.instanceId = res.Body.Data.StudyInstanceId;
          // console.log(response.Data[0].StudyInstanceId.split(','))
          this.studyId = res.Body.Data.StudyId;
          this.series = res.Body.Data.NoOfSeries;
          this.image = res.Body.Data.NoOfImages;
          this.uploadId = res.Body.Data.uploadId;
          this.sUrl = res.Body.Data.CacheServerUrl;
          //this.serverId = null;
          this.display = true;
          this.progress=false;
          this.uploadDisabled=true;
          }
          // clearInterval(this.clear);
        }else{
          if (this.process != 100) {
            console.log("set")
            // this.clear&&clearInterval(this.clear)
          setTimeout(() => {
              this.checkFileProcess();
            }, 3000);
           
        }else{
          console.log("pop")
          this.instanceId = res.Body.Data.StudyInstanceId;
        // console.log(response.Data[0].StudyInstanceId.split(','))
        this.studyId = res.Body.Data.StudyId;
        this.series = res.Body.Data.NoOfSeries;
        this.image = res.Body.Data.NoOfImages;
       
        this.uploadId = res.Body.Data.uploadId;
        this.sUrl = res.Body.Data.CacheServerUrl;
        console.log(this.sUrl)
       // this.serverId = null;
      if(this.display){
        console.log("  this.display = false;")
        this.display = false;
      }else{
       console.log("this.display = true;");
        this.display = true;
      }
     //   this.display = true;
        this.progress=false;
        this.uploadDisabled=true;
        this.folderuploadDisabled=true;
        }
      }
      
      })
  }

  upload(evt, form) {
    //  this.showDialog(evt, form);
   
    this.uploadProgress=0;
    this.process=0;
    this.uploadDisabled=true;
    this.folderuploadDisabled=true;
    var fullName = Cookie.get('firstName') + ' ' + Cookie.get('lastName');
     var dataStorageId= Cookie.get("dataStoredId");
    this.dicom.uploadFile(evt, this.id, fullName,dataStorageId)
      .progress(progressObservable => {
        progressObservable.subscribe(value => {
          this.progress = true;
          this.uploadProgress = value;
          console.log("======================", value);
          if (value == 100) {
            console.log("check")
            setTimeout(() => {
               this.checkFileProcess()
            }, 8000)

          }

        })

      })
      .subscribe((response) => {
        this.filesToUpload = [];


        this.instanceId = response.Body.Data.StudyInstanceId;
        // console.log(response.Data[0].StudyInstanceId.split(','))
        this.studyId = response.Body.Data.StudyId;
        this.series = response.Body.Data.NoOfSeries;
        this.image = response.Body.Data.NoOfImages;
        this.uploadId = response.Body.Data.Id;
        this.sUrl = response.Body.serverUrl;
        console.log(this.sUrl)
        this.serverId = response.Body.serverId

        form ? form.clear() : null;
       if( !response.Body.Data.uploadErr) {
          this.display = true;
          this.showSuccess(response.Header.message);
          this.process=100;
        this.progress=false;
        this.uploadDisabled=true;
        this.folderuploadDisabled=true;
        }
          else
          { 
            this.display = false;
            this.showError(response.Header.message);
            this.process=0;
          this.progress=false;
          this.uploadDisabled=true;
          this.folderuploadDisabled=true;
          }
        // this.display = true;
        clearInterval(this.clear);

      })


  }




  fileChangeEvent(fileInput: any, form) {

    console.log(fileInput);

    if (fileInput.files.some(f => this._validFileExtensions.indexOf(f.type) != -1)) {
      console.log(`Invalid file Added `);
      this.showError("Invalid file Added")
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
    console.log(this.sUrl)
    // this.instanceId='1.3.6.1.4.1.18047.1.11.10021841473447061672';
    var dataStorageId= Cookie.get("dataStoredId");
    this.dicom.moveToS3Upload(this.instanceId, this.uploadId, this.sUrl, this.serverId,dataStorageId)
      .subscribe((res) => {
        this.showSuccess(res.Header.message)
        console.log(res.Header.message);
        this.display = false;
        this.uploadDisabled=false;
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
        console.log("deleted ");

        this.display = false;
        this.uploadDisabled=false;
      })
  }

  moreData(data) {
    this.more = true;
    this.moreInfo = data;
  }

  getAssigned(evt) {
    if (evt) {
      this.dicom.getAssigned(this.id)
        .subscribe((res) => {
          this.dicomList = res.Body.Data.dicomList
        })
    } else {
      this.getDicomList()
    }
  }

  getNotAssigned(evt) {
    if (evt) {
      this.dicom.getNotAssigned(this.id)
        .subscribe((res) => {
          this.dicomList = res.Body.Data.dicomList;
        });
    } else {
      this.getDicomList()
    }
  }

  dicomViewer(instanceId, storageId) {
    const data = { studyInstanceId: this.id + "_" + instanceId, storageId: storageId }
    this.dicom.dicomViewer(data)
      .subscribe((res) => {
        console.log(res);
        this.srcUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.Body.Data.url);
        this.viewerUrl = res.Body.Data.url;
        this.success = true;
      }, (error) => {
        console.log("Error")
        this.success = false;

      })
  }

  scrollDown() {
    console.log('scrolled!!');
    if (this.contactListItems.TotalItemCount > this.userList.length) {
      this.dicom.getMyContacts(this.uID, 2, 10, this.contactListItems.Page + 1, this.id)
        .subscribe((res) => {
          this.userList = res.Body.Data.Item;
          console.log(res)
          let newList = res.Body.Data.Items
          let oldList = this.userList;
          this.userList = oldList.concat(newList);

          console.log(this.userList);
          this.contactListItems.Page = res.Body.Data.Page;
          // this.contactsLists = contacts.Body.Data.Item;
        });
    } else {
      console.log('End of data');
    }
  }

  getSharedIds(sPk) {

    this.dicom.getSharedIDs(sPk)
      .subscribe((res) => {
        console.log(res);
        const inviteeIds = res.Body.Data.share ? res.Body.Data.share.Invitees.split(",") : [];
        console.log(res, inviteeIds, this.userList);

        this.userList.forEach(r => {
          r.isChecked = false;
          r.isDisabled = false;
          inviteeIds.forEach(i => {
            if (i == r.Id) {
              r.isChecked = true;
              r.isDisabled = true;
            }
          })
        })
      })
  }

  close() {

    $("dicomUser").hide();
  }

  showDialog(files, form) {
    // this.toastService.activate('Comments Saved Successfully');
    // var evt=[{name:"pruthvi"},{name:"naveen"}]
    this.progressService.activate(files, this.id);
  }

  reset(){
    this.modality.map(r => r.isChecked = false);
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
      bodyParts:null,
      userId: this.id,
      pageNumber: 1,
      pageSize: 10,
      studyPK: null,
      studyUId: null,
      uploadedBy: null,
      ownedBy: null,
      sharedTo: null,
      hospitalName: null,
      userType: this.uType
    });
    this.radioReset=false;
    this.getDicomList();
  
  }

  minimize() {
    $("#resetpopup1").hide();
    $("#body").css('overflow', 'initial');
    $("#body").css('padding-right', '0px');
    $(".modal-backdrop.show").css('opacity', '1');
    $(".modal-backdrop.show").css('position', 'relative');
    $("#minimize").show();
  }

  maximize() {
    $("#minimize").hide();
    $("#resetpopup1").show();
    $("#body").css('overflow', 'hidden');
    $("#body").css('padding-right', '17px');
    $(".modal-backdrop.show").css('opacity', '17px');
  }

  maximum() {
    $(".viewer").css('max-width','100%');
    $("#maximum").hide();
    $("#normal").show();
  }

  normal() {
    $(".viewer").css('max-width','70%');
    $("#normal").hide();
    $("#maximum").show();
  }

  closeviewer() {
    $("#resetpopup1").modal('hide');
  }

  closedview() {
    $("#minimize").hide();
    $("#resetpopup1").modal('hide');
  }
}
