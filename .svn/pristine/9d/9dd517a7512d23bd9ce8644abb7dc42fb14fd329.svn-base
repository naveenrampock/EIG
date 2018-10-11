import { Component, OnInit } from '@angular/core';
import { EmrService } from '../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-emr-navigation',
  templateUrl: './emr-navigation.component.html',
  styleUrls: ['./emr-navigation.component.css']
})
export class EmrNavigationComponent implements OnInit {
  procedureCount: any;
  observationCount: any;
  medicationstatementCount: any;
  immunizationCount: any;
  encounterCount: any;
  diagnosticreportCount: any;
  deviceCount: any;
  conditionCount: any;
  careplanCount: any;
  appointmentCount: any;
  allergyCount: any;
  private userId = Cookie.get('Id');
  constructor(private emrService: EmrService) {
    
   }

  ngOnInit() {
    this.getTotalList();
  }
  
  getTotalList() {
    console.log('called');
    let params = { 'userId': this.userId }
    this.emrService.getTotalcount(params)
      .subscribe(Lists => {
        console.log(Lists.Body.Data[0]);
        this.allergyCount = Lists.Body.Data[0].Allergy;
        this.appointmentCount = Lists.Body.Data[0].Appointment;
        this.careplanCount = Lists.Body.Data[0].Careplan;
        this.conditionCount = Lists.Body.Data[0].Condition;
        this.deviceCount = Lists.Body.Data[0].Device;
        this.diagnosticreportCount = Lists.Body.Data[0].Diagnosticreport;
        this.encounterCount = Lists.Body.Data[0].Encounter;
        this.immunizationCount = Lists.Body.Data[0].Immunization;
        this.medicationstatementCount = Lists.Body.Data[0].Medicationstatement;
        this.observationCount = Lists.Body.Data[0].Observation;
        this.procedureCount = Lists.Body.Data[0].Procedure;
      })
  }
  
}
