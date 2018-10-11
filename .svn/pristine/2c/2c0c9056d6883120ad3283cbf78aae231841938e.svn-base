import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  id = Cookie.get('Id');
  modality: any;
  advanceSearch: FormGroup;
  public lang: any;
  public fm: string = "yy-mm-dd";
  public minDate: Date;
  modValue: Array<any> = [];
  msgs: Message[] = [];
  hideFile: boolean = true;
  hideFolder: boolean = false;
  constructor(private router: Router, private _FB: FormBuilder) { }

  ngOnInit() {
    this.modality = [{ name: 'DR/CR/DX' }, { name: 'US' },
    { name: 'NM' }, { name: 'RF' }, { name: 'SC' },
    { name: 'MR' }, { name: 'PT' }, { name: 'SR' }, { name: 'CT' }, { name: 'MG' }, { name: 'XA' }, { name: 'OT' }]
    this.search();
    this.calenderData();
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
      this.advanceSearch.patchValue({
        modality:this.modValue.toString()
      });
    } else {
      this.modValue.splice(this.modValue.indexOf(val), 1);
      this.advanceSearch.patchValue({
        modality:this.modValue.toString()
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
      userId: [this.id],
      pageNumber: [''],
      pageSize: [10]
    })
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
}
