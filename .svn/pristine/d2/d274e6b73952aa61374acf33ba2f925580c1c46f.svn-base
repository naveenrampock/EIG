import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { DatePipe } from '@angular/common';
import { ImmunizationDropdown, ImmunizationSelectDropDown } from './immunization-details.models';

@Component({
  selector: 'app-immunization-details',
  templateUrl: './immunization-details.component.html',
  styleUrls: ['./immunization-details.component.css']
})
export class ImmunizationDetailsComponent implements OnInit {

  isReadOnly: boolean = false;
  explanation: any;
  practitioner: any;
  selectedReason: any;
  selectedRole: any;
  selectedRoute: any;
  selectedReportOrigin: any;
  @Input() immunizationDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  public emrImmunizationdetailsForm: FormGroup;
  public msgs: any[] = [];
  public IsHidden: boolean = false;
  public selectedVaccineCode: any;
  public selectedStatus: any;
  public selectedNotGiven: any;
  public selectedText: any;
  private userId = Cookie.get('Id');
  public dateTime = new Date();
  public immunizationDropdown: ImmunizationDropdown = <ImmunizationDropdown>{};
  public immunizationSelectDropdown: ImmunizationSelectDropDown = <ImmunizationSelectDropDown>{};

  constructor(private FB: FormBuilder, private emrService: EmrService) { 
    this.dateTime.setDate(this.dateTime.getDate());
  }

  ngOnInit() {
    this.immunizationFormInit();
    this.sourceTypeValidation();
    this.getAllDropdowns();
    this.allDropDown();
  }

  public backToListing(evt) {
    this.goListingPage.emit(evt);
    this.sourceTypeValidation();
  }

  private immunizationFormInit() {
    //Add
    if (!this.immunizationDetails) {
      this.emrImmunizationdetailsForm = this.FB.group({
        Id: 0,
        PatientID: this.userId,
        SourceType: ['', Validators.required],
        SourceId: [{ value: 0, disabled: true }],
        CreatedBy: this.userId,
        Status: ['', Validators.required],
        NotGiven: ['', Validators.required],
        VaccineCode: [null, Validators.required],
        Patient: [null],
        Encounter: null,
        Date: null,
        PrimarySource: [0],
        ReportOrigin: [''],
        Location: null,
        Manufacturer: null,
        LotNumber: null,
        ExpirationDate: null,
        Site: null,
        Route: [''],
        DoseQuantity: null,
        PractitionerP: this.FB.group({ Role: null, Actor: [], Practitioner: null }),
        Note: null,
        ExplanationE: this.FB.group({ Reason: [''], ReasonNotGiven: [], Explanation: null }),
        Reaction: null,
        VaccinationProtocol: null,
        WasNotGiven: null,
      });
      this.emrImmunizationdetailsForm.get('SourceType').setValue('202');
    } else {
      // edit
      this.practitioner = JSON.parse(this.immunizationDetails.data.Practitioner);
      this.explanation = JSON.parse(this.immunizationDetails.data.Explanation);
      this.isReadOnly = true;
      this.emrImmunizationdetailsForm = this.FB.group({
        Id: this.immunizationDetails.data.Id,
        PatientID: this.immunizationDetails.data.PatientID,
        SourceType: [this.immunizationDetails.data.SourceType, Validators.required],
        SourceId: [{ value: this.immunizationDetails.data.SourceId, disabled: true }],
        CreatedBy: this.userId,
        Status: [this.immunizationDetails.data.Status, Validators.required],
        NotGiven: [this.immunizationDetails.data.NotGiven, Validators.required],
        VaccineCode: [this.immunizationDetails.data.VaccineCode, Validators.required],
        Patient: [this.immunizationDetails.data.Patient],
        Encounter: [this.immunizationDetails.data.Encounter],
        Date: this.immunizationDetails.data.Date ? new Date(this.immunizationDetails.data.Date) : null,
        PrimarySource: this.immunizationDetails.data.PrimarySource,
        ReportOrigin: [this.immunizationDetails.data.ReportOrigin],
        Location: this.immunizationDetails.data.Location,
        Manufacturer: this.immunizationDetails.data.Manufacturer,
        LotNumber: this.immunizationDetails.data.LotNumber,
        ExpirationDate: this.immunizationDetails.data.ExpirationDate,
        Site: this.immunizationDetails.data.Site,
        Route: [this.immunizationDetails.data.Route],
        DoseQuantity: this.immunizationDetails.data.DoseQuantity,
        PractitionerP: this.FB.group({ Role: this.practitioner.Role, Actor: this.practitioner.Actor, Practitioner: this.practitioner.Practitioner }),
        Note: this.immunizationDetails.data.Note,
        ExplanationE: this.FB.group({ Reason: this.explanation.Reason, ReasonNotGiven: this.explanation.ReasonNotGiven, Explanation: this.explanation.Explanation }),
        Reaction: this.immunizationDetails.data.Reaction,
        VaccinationProtocol: this.immunizationDetails.data.VaccinationProtocol,
        WasNotGiven: this.immunizationDetails.data.WasNotGiven,
      });
      if (this.immunizationDetails.data.SourceType == "203") {
        this.emrImmunizationdetailsForm.get("SourceId").enable();
      }
      else {
        this.emrImmunizationdetailsForm.get("SourceId").disable();
      }
      if (this.immunizationDetails.mode == 'readOnly') {
        this.emrImmunizationdetailsForm.disable();
      }
    }
  }

  public saveEmrImmunization() {
    let addParams = this.emrImmunizationdetailsForm.value;
    addParams.Date = new DatePipe('en').transform(addParams.Date, 'yyyy-MM-dd HH:mm:ss');
    addParams.PractitionerP = JSON.stringify(addParams.PractitionerP);
    addParams.ExplanationE = JSON.stringify(addParams.ExplanationE);
    this.emrService.addEmrImmunization(addParams).subscribe(res => {
      this.successMessagePopup(res)
    })
  }

  public updateEmrImmunization() {
    let updateParams = this.emrImmunizationdetailsForm.value;
    updateParams.Date = new DatePipe('en').transform(updateParams.Date, 'yyyy-MM-dd HH:mm:ss');
    updateParams.PractitionerP = JSON.stringify(updateParams.PractitionerP);
    updateParams.ExplanationE = JSON.stringify(updateParams.ExplanationE);
    this.emrService.updateEmrImmunization(updateParams).subscribe(res => {
      this.successMessagePopup(res)
    })
  }


  private sourceTypeValidation() {
    this.emrImmunizationdetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      if (val) {
        if (val == "203")
          this.emrImmunizationdetailsForm.get("SourceId").enable();
        else
          this.emrImmunizationdetailsForm.get("SourceId").disable();
      }
    });
  }

  public searchDropDown(Id, desc) {
    let params = { Id, desc: desc }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        var data = res.Body.Data.filter(
          item => item.Description.toLowerCase().indexOf(desc.toLowerCase()) == 0
        );
        if (data == '') {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'There is no values for this character, please enter other character' }];
        }
        this.IsHidden = true;
        this.initializeAllDropDown(data)
      })
  }

  public getValue(item) {
    this.IsHidden = false;
    if (item.CategoryId == 111) {
      this.selectedVaccineCode = item.Description;
    }
  }

  private showSuccess(msg) {
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private successMessagePopup(res) {
    if (res.Header.Success) {
      this.showSuccess(res.Header.Message)
      setTimeout(() => {
        this.backToListing('getAPI');
      }, 1000);
    }
  }

  private getAllDropdowns() {
    if (this.immunizationDetails) {
      this.selectedVaccineCode = this.immunizationDetails.data.VaccineCode;
    }
  }

  private initializeAllDropDown(data) {
    this.immunizationSelectDropdown = <ImmunizationSelectDropDown>{
      vaccineCode: data.filter(r => r.CategoryId == '111')
    };
  }

  private allDropDown() {
    let params = { Id: "11,110,178,114,112,115,116", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.initializeSelectDropDown(res.Body.Data);
      })
  }

  private initializeSelectDropDown(data) {
    this.immunizationDropdown = <ImmunizationDropdown>{
      sourceTypes: data.filter(r => r.CategoryId == '11'),
      notGivenDrp: data.filter(r => r.CategoryId == '178'),
      statusDrp: data.filter(r => r.CategoryId == '110'),
      routeDrp: data.filter(r => r.CategoryId == '114'),
      reportOrigin: data.filter(r => r.CategoryId == '112'),
      role: data.filter(r => r.CategoryId == '115'),
      reason: data.filter(r => r.CategoryId == '116')
    }
  }

}

