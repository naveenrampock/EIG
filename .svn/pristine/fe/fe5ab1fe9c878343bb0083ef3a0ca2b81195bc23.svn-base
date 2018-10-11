import { Component, OnInit } from '@angular/core';
import { DicomService } from '../dicom.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
declare var $;
@Component({
  selector: 'app-shared-dicom',
  templateUrl: './shared-dicom.component.html',
  styleUrls: ['./shared-dicom.component.css']
})
export class SharedDicomComponent implements OnInit {
  pageNo: number;
  ownerName: string;
  totalCount: any;
  dicomList: Array<any> = [];
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  private userList: any;
  private StudyPk: any;

  contactListItems: any;
  private checkboxInvitee: Array<any> = [];
  msgs: Message[] = [];
  advanceSearch: FormGroup;

  public lang: any;
  public fm: string = "yy-mm-dd";
  public EminDate: Date;
  public UminDate: Date;
  modality: any;
  lazy:boolean=false;
  radioReset:boolean=false;
  constructor(private dicom: DicomService,private _FB: FormBuilder) { }

  ngOnInit() {
    this.modality = [{ name: 'DR/CR/DX' }, { name: 'US' },
    { name: 'NM' }, { name: 'RF' }, { name: 'SC' },
    { name: 'MR' }, { name: 'PT' }, { name: 'SR' }, { name: 'CT' }, { name: 'MG' }, { name: 'XA' }, { name: 'OT' }];

    this.getContacts()
      .subscribe((userList) => {
        this.getSharedDicom()
          .subscribe((dicomList) => {

            console.log(dicomList);
            this.lazy=true;
          });
      });
      this.search();
      this.calenderData();
      this.advanceSearch.get('cStartDate').valueChanges.subscribe((val) => {
        this.EminDate = this.advanceSearch.get('cStartDate').value;
        console.log("emin", this.EminDate)
      });
      this.advanceSearch.get('uStartDate').valueChanges.subscribe((r) => {
        this.UminDate = this.advanceSearch.get('uStartDate').value;
  
      })
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

  getStudyId(sPk, invitees) {
    this.StudyPk = sPk;
    this.getContacts()
      .subscribe((userList) => {
        if (invitees) {
          let inviteeIds = invitees.split(",")

          this.userList.forEach(r => {
            inviteeIds.forEach(i => {
              if (i == r.Id) {
                r.isChecked = true;
                r.isDisabled = true;
              }
            })
          })
        }
      });

  }
  getSharedDicom() {
    //  var userID = parseInt(this.id);
    return this.dicom.userSharedDicomList(this.id)
      .map(res => res.Body.Data.dicomList)
      .flatMap(diL=>{return this.getContacts().map(cl=>diL)})
      .map(dicomList => {
        dicomList.forEach(dicom => {
          dicom.InviteesNames = dicom.Invitees ? this.userList.filter(e => dicom.Invitees.split(",").find(i => i == e.Id)).map(u => u.FirstName) : '';
        });
        return dicomList;
      })
      .do(list => this.dicomList = list);
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  deleteDicom(del) {
    console.log(del)
    this.dicom.delDicom(del)
      .subscribe((res) => {
        this.showSuccess(res.Header.message);
        this.getSharedDicom().subscribe();
        console.log(res);
      })
  }

  unshareDicom(StudyPk, shareId) {
    let data = { userId: this.id, studyPk: this.StudyPk, invitees: this.checkboxInvitee.toString() }
    this.dicom.userUnShareDicom(data)
      .subscribe((res) => {
        this.getSharedDicom().subscribe();
        this.showSuccess(res.Header.message);
        $('#dicomUser').modal('hide');
        console.log(res);
      })
  }

  unShareCheckboxInvitee(evt, id) {
    if (!evt) {
      this.checkboxInvitee.push(id);
      console.log(this.checkboxInvitee);
    } else {
      this.checkboxInvitee.splice(this.checkboxInvitee.indexOf(id), 1);
      console.log(this.checkboxInvitee);
    }
  }

  shareDicom() {
    let data = { userId: this.id, studyPk: this.StudyPk, invitees: this.checkboxInvitee.toString() }
    this.dicom.shareDicom(data)
      .subscribe((res) => {
        console.log(res);
        this.showSuccess(res.Header.message);

      })
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

  getUserList(ids, StudyPk) {

    this.dicom.getUserList(ids)
      .subscribe((res) => {
        this.userList = res.Body.Data;
        this.contactListItems = res.Body.Data;
        this.StudyPk = StudyPk
        console.log(res);
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

  getContacts() {

    return this.dicom.getMyContacts(this.uID, 2, 10, 1, this.id)
      .map((res) => res.Body.Data.Item).do(userList => this.userList = userList);
  }




  getAssigned(evt) {
    if (evt) {
      this.dicom.getAssigned(this.id)
        .subscribe((res) => {
          this.dicomList = res.Body.Data.dicomList
        })
    } else {
      this.getSharedDicom().subscribe();
    }
  }

  getNotAssigned(evt) {
    if (evt) {
      this.dicom.getNotAssigned(this.id)
        .subscribe((res) => {
          this.dicomList = res.Body.Data.dicomList;
        });
    } else {
      this.getSharedDicom().subscribe();
    }
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
