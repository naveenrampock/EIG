import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { EmrService } from '../emr.service';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css']
})
export class ExportsComponent implements OnInit {

  @ViewChild('AllergyViewChild') AllergyViewChild: ElementRef;
  @ViewChild('EncountersViewChild') EncountersViewChild: ElementRef;
  @ViewChild('MedicationViewChild') MedicationViewChild: ElementRef;
  @ViewChild('DeviceViewChild') DeviceViewChild: ElementRef;
  @ViewChild('ImmunizationViewChild') ImmunizationViewChild: ElementRef;
  @ViewChild('ProcedureViewChild') ProcedureViewChild: ElementRef;
  @ViewChild('ccrAllergyViewChild') ccrAllergyViewChild: ElementRef;
  @ViewChild('ccrEncountersViewChild') ccrEncountersViewChild: ElementRef;
  @ViewChild('ccrMedicationViewChild') ccrMedicationViewChild: ElementRef;
  @ViewChild('ccrDeviceViewChild') ccrDeviceViewChild: ElementRef;
  @ViewChild('ccrImmunizationViewChild') ccrImmunizationViewChild: ElementRef;
  @ViewChild('ccrProcedureViewChild') ccrProcedureViewChild: ElementRef;
  totalcount: any;
  emrExportToCCDList: any;
  emrExportToCCrList: any;
  ccdAllergy: Array<any> = [];
  ccdMedication: Array<any> = [];
  ccdDevice: Array<any> = [];
  ccdImmunization: Array<any> = [];
  ccdProcedure: Array<any> = [];
  ccdEncounters: Array<any> = [];
  ccrAllergy: Array<any> = [];
  ccrMedication: Array<any> = [];
  ccrDevice: Array<any> = [];
  ccrImmunization: Array<any> = [];
  ccrProcedure: Array<any> = [];
  ccrEncounters: Array<any> = [];
  isAvailable: boolean = true;
  public tableHeaders = [];
  public tableHeaders1 = [];
  public tableHeaders2 = [];
  public tableHeaders3 = [];
  public tableHeaders4 = [];
  public tableHeaders5 = [];
  private userId = Cookie.get('Id');

  constructor(private emrService: EmrService) { }

  ngOnInit() {
    this.getEmrCcdExportList();
    this.getEmrCcrExportList();
    this.tableHeaders = ['Medication', 'Instruction', 'StartDate', 'Status'];
    this.tableHeaders1 = ['DeviceName', 'DeviceSuppliedDate'];
    this.tableHeaders2 = ['Vaccine', 'Date', 'Status'];
    this.tableHeaders4 = ['Performed', 'Performed Date and Time', 'ReasonReference'];
    this.tableHeaders5 = ['Location Status', 'Location Period', 'Period'];
    this.tableHeaders3 = ['Reaction', 'Substance', 'VerificationStatus'];
  }

  getEmrCcdExportList() {
    let params = { 'Id': this.userId }
    this.emrService.getExportCcdDetails(params)
      .subscribe(exportCcdLists => {
        this.emrExportToCCDList = exportCcdLists.Body.Data;
        this.ccdMedication = this.emrExportToCCDList.Medication;
        this.ccdImmunization = this.emrExportToCCDList.Immunization;
        this.ccdDevice = this.emrExportToCCDList.Device;
        this.ccdAllergy = this.emrExportToCCDList.Allergy;
        this.ccdEncounters = this.emrExportToCCDList.Encounter;
        this.ccdProcedure = this.emrExportToCCDList.Procedure;
        this.ccdProcedure.map(dv => {
          dv.Performed = JSON.parse(dv.Performed);
        })
        this.ccdEncounters.map(dv => {
          dv.Location = JSON.parse(dv.Location);
        })
      })
  }

  getEmrCcrExportList() {
    let params = { 'Id': this.userId }
    this.emrService.getExportCcrDetails(params)
      .subscribe(exportCcrLists => {
        this.emrExportToCCrList = exportCcrLists.Body.Data;
        console.log(this.emrExportToCCrList);
        this.ccrMedication = this.emrExportToCCrList.Medication;
        this.ccrImmunization = this.emrExportToCCrList.Immunization;
        this.ccrDevice = this.emrExportToCCrList.Device;
        this.ccrAllergy = this.emrExportToCCrList.Allergy;
        this.ccrEncounters = this.emrExportToCCrList.Encounter;
        this.ccrProcedure = this.emrExportToCCrList.Procedure;
        this.ccrProcedure.map(dv => {
          dv.Performed = JSON.parse(dv.Performed);
        })
        this.ccrEncounters.map(dv => {
          dv.Location = JSON.parse(dv.Location);
        })
      })
  }

  saveExportInfo() {
    if (this.AllergyViewChild.nativeElement.checked) {
      console.log(this.ccdAllergy);
    }
    if (this.ProcedureViewChild.nativeElement.checked) {
      console.log(this.ccdProcedure);
    }
    if (this.EncountersViewChild.nativeElement.checked) {
      console.log(this.ccdEncounters);
    }
    if (this.DeviceViewChild.nativeElement.checked) {
      console.log(this.ccdDevice);
    }
    if (this.ImmunizationViewChild.nativeElement.checked) {
      console.log(this.ccdImmunization);
    }
    if (this.MedicationViewChild.nativeElement.checked) {
      console.log(this.ccdMedication);

    } if (this.ccrAllergyViewChild.nativeElement.checked) {
      console.log(this.ccrAllergy);
    }
    if (this.ccrProcedureViewChild.nativeElement.checked) {
      console.log(this.ccrProcedure);
    }
    if (this.ccrEncountersViewChild.nativeElement.checked) {
      console.log(this.ccrEncounters);
    }
    if (this.ccrDeviceViewChild.nativeElement.checked) {
      console.log(this.ccrDevice);
    }
    if (this.ccrImmunizationViewChild.nativeElement.checked) {
      console.log(this.ccrImmunization);
    }
    if (this.ccrMedicationViewChild.nativeElement.checked) {
      console.log(this.ccrMedication);
    }
  }
}
