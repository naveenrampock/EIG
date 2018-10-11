import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';
import { AllergyDropDown, AllergySelectDropDown } from './allergy-details.models';

@Component({
  selector: 'app-allergy-details',
  templateUrl: './allergy-details.component.html',
  styleUrls: ['./allergy-details.component.css']
})
export class AllergyDetailsComponent implements OnInit {

  @Input() allergyDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  public emrAllergydetailsForm: FormGroup;
  public msgs: any[] = [];
  public selectedexposureDrp: any;
  public selectedcodeDrp: any;
  public selectedManifestation: any;
  public selectedSubstance: any;
  public IsHidden: boolean = false;
  public allergy: any;
  public isReadOnly: boolean = false;
  public dateTime = new Date();
  private userId = Cookie.get('Id');

  public allergyDropDown: AllergyDropDown = <AllergyDropDown>{};
  public allergySelectDropDown: AllergySelectDropDown = <AllergySelectDropDown>{};

  constructor(private FB: FormBuilder, private emrService: EmrService, private ref: ChangeDetectorRef) {
    this.dateTime.setDate(this.dateTime.getDate());
  }

  ngOnInit() {
    this.allergyFormInit();
    this.sourceTypeValidation();
    this.getAllDropdowns();
    this.allDropDown();
  }

  public backToListing(evt) {
    this.goListingPage.emit(evt);
    this.sourceTypeValidation();
  }

  public saveEmrAllergy() {
    let addParams = this.emrAllergydetailsForm.value;
    addParams.Reaction = JSON.stringify(addParams.Reaction);
    addParams.AssertedDate = new DatePipe('en').transform(addParams.AssertedDate, 'yyyy-MM-dd HH:mm:ss');
    addParams.LastOccurrence = new DatePipe('en').transform(addParams.LastOccurrence, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.addEmrAllergy(addParams).subscribe(res => {
      this.successMessagePopUp(res);
    })

  }

  public updateEmrAllergy() {
    let updateParams = this.emrAllergydetailsForm.value;
    updateParams.Reaction = JSON.stringify(updateParams.Reaction);
    updateParams.AssertedDate = new DatePipe('en').transform(updateParams.AssertedDate, 'yyyy-MM-dd HH:mm:ss');
    updateParams.LastOccurrence = new DatePipe('en').transform(updateParams.LastOccurrence, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.updateEmrAllergy(updateParams).subscribe(res => {
      this.successMessagePopUp(res)
    })
  }

  public getAllDropdowns() {
    if (this.allergyDetails) {
      this.selectedcodeDrp = this.allergyDetails.data.Code,
        this.selectedexposureDrp = this.allergy.ExposureRoute,
        this.selectedSubstance = this.allergy.Substance,
        this.selectedManifestation = this.allergy.Manifestation
    }
  }

  public getValue(item) {
    this.IsHidden = false;
    if (item.CategoryId == 137) {
      this.selectedcodeDrp = item.Description;
    }
    if (item.CategoryId == 139) {
      this.selectedexposureDrp = item.Description;
    }
    if (item.CategoryId == 174) {
      this.selectedSubstance = item.Description;
    }
    if (item.CategoryId == 175) {
      this.selectedManifestation = item.Description;
    }
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

  private allergyFormInit() {
    if (!this.allergyDetails) {
      this.emrAllergydetailsForm = this.FB.group({
        ID: 0,
        PatientID: this.userId,
        SourceType: ['', Validators.required],
        SourceID: [{ value: 0, disabled: true }],
        CreatedBy: this.userId,
        ClinicalStatus: ['', Validators.required],
        VerificationStatus: ['', Validators.required],
        Type: ['', Validators.required],
        Category: ['', Validators.required],
        Criticality: ['', Validators.required],
        Code: ['', Validators.required],
        Patient: null,
        AssertedDate: null,
        Recorder: ['', Validators.required],
        LastOccurrence: null,
        Note: null,
        Asserter: null,
        Reaction: this.FB.group({ Substance: [null, Validators.required], Manifestation: [null, Validators.required], Description: [null, Validators.required], Severity: [null, Validators.required], ExposureRoute: [null, Validators.required], Onset: null, Note: null }),
      });
      this.emrAllergydetailsForm.get('SourceType').setValue('202');
    } else {
      // edit
      this.isReadOnly = true;
      this.allergy = JSON.parse(this.allergyDetails.data.Reaction);
      this.emrAllergydetailsForm = this.FB.group({

        ID: this.allergyDetails.data.Id,
        PatientID: this.userId,
        SourceType: [this.allergyDetails.data.SourceType, Validators.required],
        SourceID: [{ value: this.allergyDetails.data.SourceID, disabled: true }],
        CreatedBy: this.userId,
        ClinicalStatus: [this.allergyDetails.data.ClinicalStatus, Validators.required],
        VerificationStatus: [this.allergyDetails.data.VerificationStatus, Validators.required],
        Type: [this.allergyDetails.data.Type, Validators.required],
        Category: [this.allergyDetails.data.Category, Validators.required],
        Criticality: [this.allergyDetails.data.Criticality, Validators.required],
        Code: [this.allergyDetails.data.Code, Validators.required],
        Patient: this.allergyDetails.data.Patient,
        AssertedDate: this.allergyDetails.data.AssertedDate ? new Date(this.allergyDetails.data.AssertedDate) : null,
        Recorder: [this.allergyDetails.data.Recorder, Validators.required],
        Asserter: this.allergyDetails.data.Asserter,
        LastOccurrence: this.allergyDetails.data.LastOccurrence ? new Date(this.allergyDetails.data.LastOccurrence) : null,
        Note: this.allergyDetails.data.Note,
        Reaction: this.FB.group({ Substance: [this.allergy.Substance, Validators.required], Manifestation: [this.allergy.Manifestation, Validators.required], Description: [this.allergy.Description, Validators.required], Severity: [this.allergy.Severity, Validators.required], ExposureRoute: this.allergy.ExposureRoute, Onset: this.allergy.Onset, Note: this.allergy.Note })
      });
      if (this.allergyDetails.data.SourceType == "203") {
        this.emrAllergydetailsForm.get("SourceID").enable();
      }
      else {
        this.emrAllergydetailsForm.get("SourceID").disable();
      }
      if (this.allergyDetails.mode == 'readOnly') {
        this.emrAllergydetailsForm.disable();
      }
    }
  }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private successMessagePopUp(res) {
    if (res.Header.Success) {
      this.showSuccess(res.Header.Message)
      setTimeout(() => {
        this.backToListing('getAPI');
      }, 1000);
    }
  }

  private sourceTypeValidation() {
    this.emrAllergydetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      if (val == "203")
        this.emrAllergydetailsForm.get("SourceID").enable();
      else
        this.emrAllergydetailsForm.get("SourceID").disable();
    });
  }

  private initializeAllDropDown(data) {
    this.allergyDropDown = <AllergyDropDown>{
      codeDrp: data.filter(r => r.CategoryId == '137'),
      exposureDrp: data.filter(r => r.CategoryId == '139'),
      substance: data.filter(r => r.CategoryId == '174'),
      manifestation: data.filter(r => r.CategoryId == '175'),
    };
  }

  private allDropDown() {
    let params = { Id: "11,132,133,134,135,136,138", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        console.log(res);
        this.initializeSelectDropDown(res.Body.Data);
      })
  }

  private initializeSelectDropDown(data) {
    this.allergySelectDropDown = <AllergySelectDropDown>{
      sourceTypes: data ? data.filter(r => r.CategoryId == '11') : [],
      clinicalDrp: data.filter(r => r.CategoryId == '132'),
      verificationDrp: data.filter(r => r.CategoryId == '133'),
      typeDrp: data.filter(r => r.CategoryId == '134'),
      categoryDrp: data.filter(r => r.CategoryId == '135'),
      criticalDrp: data.filter(r => r.CategoryId == '136'),
      severityDrp: data.filter(r => r.CategoryId == '138'),
    }
  }
}

