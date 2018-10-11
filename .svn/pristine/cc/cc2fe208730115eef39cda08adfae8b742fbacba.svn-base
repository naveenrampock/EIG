import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { EmrService } from '../../emr.service';

@Component({
  selector: 'app-addccr-details',
  templateUrl: './addccr-details.component.html',
  styleUrls: ['./addccr-details.component.css']
})
export class AddccrDetailsComponent implements OnInit {
  details: any;
  List: Array<any>;
  @Input() addccrDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  msgs: any[];
  defaultValue:any;
  constructor(private emrservice: EmrService) { }


  ngOnInit() {
    this.List = [{"Summary":"I Comp Metabolic Profile","Type":"Lab results","Date":"9/22/2011 08:43:10 AM","Source":"TouchWorks by Allscripts Healthcare..."},
    {"Summary":"I Hemoglobin A1C","Type":"Lab results","Date":"9/22/2011 08:43:10 AM","Source":"TouchWorks by Allscripts Healthcare..."},
    {"Summary":"I Microalbumin, Random Urine","Type":"Lab results","Date":"9/22/2011 08:43:10 AM","Source":"TouchWorks by Allscripts Healthcare..."},
    {"Summary":"Influenza(Split)","Type":"Lab results","Date":"9/22/2011 08:43:10 AM","Source":"TouchWorks by Allscripts Healthcare..."},
    {"Summary":"Pneumo","Type":"Lab results","Date":"9/22/2011 08:43:10 AM","Source":"TouchWorks by Allscripts Healthcare..."},
    {"Summary":"DT","Type":"Lab results","Date":"9/22/2011 08:43:10 AM","Source":"TouchWorks by Allscripts Healthcare..."},
  ];
  this.details = [{"name":"????","Generic":"lisinopril 10 mg oral tablet","Dosage":"1.0.1","date":"9/22/2008 10:12:56 AM -0500","prescribedby":"Lee Morris MD","address":"Base Physician Office,2800 Rockcreek Parkway,(816)201-1190,kansas City,MO,64117-US","prescribed":"11/18/2000 07:12:46 AM -0500"}]
}
 
  backToListing() {
    console.log('back off');
    this.goListingPage.emit('');
  }

  showError(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }
  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }
  detailsList(rowData) {
    console.log(rowData)
    rowData.showDetailsList = !rowData.showDetailsList;
  }
}

