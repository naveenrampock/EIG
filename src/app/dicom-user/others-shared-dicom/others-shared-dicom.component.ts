import { Component, OnInit } from '@angular/core';
import { DicomService } from '../dicom.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-others-shared-dicom',
  templateUrl: './others-shared-dicom.component.html',
  styleUrls: ['./others-shared-dicom.component.css']
})
export class OthersSharedDicomComponent implements OnInit {
  pageNo: number;
  ownerName: string;
  totalCount: any;
  dicomList: Array<any> = [];
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  more: boolean = false;
  moreInfo: any;
  advanceSearch: FormGroup;
  modality: any;
  public lang: any;
  public fm: string = "yy-mm-dd";
  public EminDate: Date;
  public UminDate: Date;
  lazy:boolean=false;
  radioReset:boolean=false;
  constructor(private dicom: DicomService,private _FB: FormBuilder) { }

  ngOnInit() {
   
    this.modality = [{ name: 'DR/CR/DX' }, { name: 'US' },
    { name: 'NM' }, { name: 'RF' }, { name: 'SC' },
    { name: 'MR' }, { name: 'PT' }, { name: 'SR' }, { name: 'CT' }, { name: 'MG' }, { name: 'XA' }, { name: 'OT' }];
    this.search();
      this.calenderData();
      this.advanceSearch.get('cStartDate').valueChanges.subscribe((val) => {
        this.EminDate = this.advanceSearch.get('cStartDate').value;
        console.log("emin", this.EminDate)
      });
      this.advanceSearch.get('uStartDate').valueChanges.subscribe((r) => {
        this.UminDate = this.advanceSearch.get('uStartDate').value;
  
      })
      this.dicomSharedByOthers();
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
      pageNumber: [1],
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
  dicomSharedByOthers(){
    // var userID = parseInt(this.id);
 
    this.dicom.dicomSharedByOthersList(this.id)
      .subscribe((res) => {
        console.log(res);
        this.dicomList = res.Body.Data.dicomList;
        this.lazy=true;
      })
 
}

getAssigned(evt){
  if(evt){
    this.dicom.getAssigned(this.id)
    .subscribe((res)=>{
      this.dicomList=res.Body.Data.dicomList
    })
  }else{
    this.dicomSharedByOthers();
  }
}

getNotAssigned(evt){
  if(evt){
    this.dicom.getNotAssigned(this.id)
    .subscribe((res)=>{
      this.dicomList=res.Body.Data.dicomList;
    });
  }else{
    this.dicomSharedByOthers();
  }
}

moreData(data) {
  console.log("sdf")
  this.more = true;
  this.moreInfo = data;
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
  })
  this.radioReset=false;
  this.ngOnInit();

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

loadLazy(LazyLoadEvent) {

  this.pageNo = (LazyLoadEvent.first + 10) / 10;
  this.advanceSearch.patchValue({
    pageNumber: this.pageNo
  });
  this.getDicomList();

}
}
