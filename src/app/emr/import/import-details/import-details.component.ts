import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectorRef,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-import-details',
  templateUrl: './import-details.component.html',
  styleUrls: ['./import-details.component.css']
})
export class ImportDetailsComponent implements OnInit {
  @Input() importDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  @ViewChild('allergyViewChild') allergyViewChild: ElementRef;
  @ViewChild('CarePlanViewChild') CarePlanViewChild: ElementRef;
  @ViewChild('ConditionViewChild') ConditionViewChild: ElementRef;
  @ViewChild('deviceViewChild') deviceViewChild: ElementRef;
  @ViewChild('immunizationViewChild') immunizationViewChild: ElementRef;
public msgs: any[] = [];
  allergy:any;
  CarePlan:any;
  Condition:any;
  device:any;
  immunization:any;
  constructor() { }

  ngOnInit() {
    this.allergy = [{"Criticality":"CRITL","Patient":"Jason Argonaut","Substance":"PENICILLIN G","Reaction":"Confirmed","Onset":"2012-11-07T00:00:00Z","Recorder":"MOORE, SEAN"}]
    this.CarePlan = [{"Addresses":"CRITL","Status":"active","Category":"other","Prohibited":"FALSE","Goal":"Hemoglobin A1c","code":"CBC AND DIFFERENTIAL"}]
    this.Condition = [{"ClinicalStatus":"Active","VerificationStatus":"Confirmed","Asserter":"MOORE, SEAN","Code":"","category":"","Severity":"Medium"}]
    this.device = [{"Udi":"(17)170324(21)455884315749","Status":"Available","Model":"G754-B","ExpirationDate":"2017-03-24T00:00:00Z","Patient":"Jason Argonaut"}]
    this.immunization = [{"Status":"Completed","WasNotGiven":"FALSE","VaccineCode":"DTP-Hib-Hep B","LotNumber":"12321","Date":"2016-01-09T00:00:00Z","Patient":"Jason Argonaut","Route":"Intravenous","Site":"Left arm"}]
  }
  
  exportEmr() {
    if(this.allergyViewChild.nativeElement.checked){
      console.log(this.allergy);
    }
    if(this.CarePlanViewChild.nativeElement.checked){
      console.log(this.CarePlan);
    }
    if(this.ConditionViewChild.nativeElement.checked){
      console.log(this.Condition);
    }
    if(this.deviceViewChild.nativeElement.checked){
      console.log(this.device);
    }
    if(this.immunizationViewChild.nativeElement.checked){
      console.log(this.immunization);
    }
  }
}