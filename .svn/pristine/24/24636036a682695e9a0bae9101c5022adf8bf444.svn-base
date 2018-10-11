import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { EmrService } from '../../emr.service';

@Component({
  selector: 'app-addccd-details',
  templateUrl: './addccd-details.component.html',
  styleUrls: ['./addccd-details.component.css']
})
export class AddccdDetailsComponent implements OnInit {
  details: any;
  Condition: any;
  Medication: Array<any>;
  @Input() addccdDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  msgs: any[];
  defaultValue:any;
  constructor(private emrservice: EmrService) { }

  ngOnInit() {
    this.defaultValue = 1;
    this.Medication = [{"name":"????","Reason":"","Date":"9/22/2011 08:43:10 AM - 0500","DateStopped":"","Dose":"1.0.1","Strength":""},
    {"name":"????","Reason":"","Date":"5/14/2011 11:43:18 AM - 0500","DateStopped":"","Dose":"2.0.1","Strength":""},
    {"name":"????","Reason":"","Date":"9/22/2011 08:43:10 AM - 0500","DateStopped":"","Dose":"3.0.1","Strength":""},
    {"name":"Tavist","Reason":"","Date":"7/15/2011 08:43:10 AM - 0500","DateStopped":"","Dose":"4.0.1","Strength":""}
  ];
    this.Condition = [{"name":"CEREBRAL ARTERY OCCLUSION,UNISPECIF","Status":"Current: Currently has this","date":"9/22/2009","Stop":""},
    {"name":"Chronic Obstruct Airways Disease","Status":"Current: Currently has this","date":"7/17/2011","Stop":""}]
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
