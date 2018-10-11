import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Http } from '@angular/http/src/http';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/src/services/cookie';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-dataStorage',
  templateUrl: './dataStorage.component.html',
  styleUrls: ['./dataStorage.component.css']
})

export class DataStorageComponent implements OnInit {
  @Output() sendtoparent: EventEmitter<any> = new EventEmitter();
  @Input() dicomList: any;

  modality: any;
  modValue: Array<any> = [];
  advanceSearch: FormGroup;
  public lang: any;
  public fm: string = "yy-mm-dd";
  public minDate: Date;
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  constructor(private _FB: FormBuilder) { }

  ngOnInit() {
    
    this.minDate = new Date();
    this.modality = [{ name: 'DR/CR/DX' }, { name: 'US' },
    { name: 'NM' }, { name: 'RF' }, { name: 'SC' },
    { name: 'MR' }, { name: 'PT' }, { name: 'SR' }, { name: 'CT' }, { name: 'MG' }, { name: 'XA' }, { name: 'OT' }]
  }
  search() {
    this.advanceSearch = this._FB.group({
      userId: [this.id],
      userType: [this.uType],
       pageNumber: [''],
      pageSize: [10],
      myImage: [null],
      myUpload: [null],
      shareByothers: [null],
      studyId: [''],
      patientId: [''],
      patientName: [''],
      cStartDate: [null],
      cEndDate: [null],
      uStartDate: [null],
      uEndDate: [null],
      modality: [''], 
    })
  }


  private calenderData(){
    this.lang = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Пон", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  }
  

  public focus(evt){
    if(this.fm == "yy.mm.dd"){
    this.fm = "yy-mm-dd";
    setTimeout(() =>{
        evt.target.value = evt.target.value.replace(/\./g,"-");
    });
    }
    else if(this.fm == "yy/mm/dd"){
        this.fm = "yy-mm-dd";
    setTimeout(() =>{
        evt.target.value = evt.target.value.replace(/\//g,"-");
        
    });
    }
  }

  public cal(evt) {
    if (evt.indexOf("/") > -1) {
      this.fm = "yy/mm/dd";
    } else if (evt.indexOf(".") > -1) {
      this.fm = "yy.mm.dd"; 
    } else if (evt.indexOf("-") > -1)
    { this.fm = "yy-mm-dd" }

  }

  modalityValue(evt, val) {
    if (evt) {
      this.modValue.push(val)
    } else {
      this.modValue.splice(this.modValue.indexOf(val), 1);
    }
  }

  sendparent() {
    this.sendtoparent.emit('sendsomething');
    console.log(this.dicomList + 'datastore');
  }
}
