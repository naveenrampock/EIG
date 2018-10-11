import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { DatePipe } from '@angular/common';
import { MedicationDropDown } from './medication-details.models';

@Component({
  selector: 'app-medication-statement-details',
  templateUrl: './medication-statement-details.component.html',
  styleUrls: ['./medication-statement-details.component.css']
})
export class MedicationStatementDetailsComponent implements OnInit {
  
  medicationStage: any;
  medicationlink: boolean = true;
  medicationScreen: boolean = false;
  medList: any;
  selectedAll: any;
  selectedReasonNotTaken: boolean = false;
  selectedTaken: boolean = false;
  selectedCategory: any;
  selectedStatus: any;
  selectedText: any;
  isReadOnly: boolean = false;
  @Input() medicationDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  public emrMedicationdetailsForm: FormGroup;
  public msgs: any[] = [];
  public IsHidden: boolean = false;
  public medicationDropdown: MedicationDropDown = <MedicationDropDown>{};
  private userId = Cookie.get('Id');
  public dateTime = new Date();
  public yesterday = new Date();

  constructor(private FB: FormBuilder, private emrService: EmrService) { 
    this.dateTime.setDate(this.dateTime.getDate());
    this.yesterday.setDate(this.yesterday.getDate());
  }

  ngOnInit() {
    this.medicationFormInit();
    this.searchDropDown();
    this.medicationViewMode();
    this.sourceTypeValidation();
    this.getMedicationLinks();
  }

  public backToListing(evt) {
    this.goListingPage.emit(evt);
    this.sourceTypeValidation();
  }

  medicationViewMode() {
    if (this.medicationDetails) {
      if (this.medicationDetails.mode == 'readOnly') {
        this.medicationlink = false;
      } else {
        this.medicationlink = true;
      }
    }
  }

  public saveEmrMedication() {
    let addParams = this.emrMedicationdetailsForm.value;
    addParams.Medicationx = this.medicationStage;
    addParams.InformationSource = JSON.stringify(this.periodNote.value);
    addParams.DateAsserted = new DatePipe('en').transform(addParams.DateAsserted, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.addEmrMedicationStatement(addParams).subscribe(res => {
      console.log(res);
      this.successMessagePopUp(res);
    })
  }

  public updateEmrMedication() {
    let updateParams = this.emrMedicationdetailsForm.value;
    updateParams.InformationSource = JSON.stringify(this.periodNote.value);
    console.log(updateParams);
    updateParams.DateAsserted = new DatePipe('en').transform(updateParams.DateAsserted, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.updateEmrMedicationStatement(updateParams).subscribe(res => {
      this.successMessagePopUp(res)
    })
  }

  public searchDropDown() {
    let params = { Id: "11,38,39,30,171", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        console.log(res);
        this.IsHidden = true;
        this.initializeAllDropDown(res.Body.Data)
      })
  }

  private medicationFormInit() {
    //Add
    if (!this.medicationDetails) {

      this.emrMedicationdetailsForm = this.FB.group({
        ID: 0,
        PatientID: this.userId,
        SourceType: ['', Validators.required],
        SourceID: [{ value: 0, disabled: true }],
        CreatedBy: this.userId,
        BasedOn: [''],
        PartOf: [''],
        Context: [''],
        Status: ['', Validators.required],
        Category: ['', Validators.required],
        Medicationx: null,
        Effectivex: null,
        DateAsserted: null,
        InformationSource: this.FB.array([]),
        Subject: null,
        DerivedFrom: null,
        Taken: null,
        ReasonNotTaken: null,
        ReasonCode: null,
        ReasonReference: null,
        Note: null,
        Dosage: null,
      });
      this.addDatePeriod();
      this.emrMedicationdetailsForm.get('SourceType').setValue('202');
    } else {
      // edit
      this.isReadOnly = true;

      this.emrMedicationdetailsForm = this.FB.group({
        Id: this.medicationDetails.data.Id,
        PatientID: this.medicationDetails.data.PatientID,
        SourceType: [this.medicationDetails.data.SourceType, Validators.required],
        SourceID: [{ value: this.medicationDetails.data.SourceId, disabled: true }],
        CreatedBy: this.userId,
        BasedOn: [this.medicationDetails.data.BasedOn],
        PartOf: [this.medicationDetails.data.PartOf],
        Context: [this.medicationDetails.data.Context],
        Status: [this.medicationDetails.data.STATUS, Validators.required],
        Category: [this.medicationDetails.data.Category, Validators.required],
        Medicationx: this.medicationDetails.data.Medication,
        Effectivex: this.medicationDetails.data.Effective,
        DateAsserted: this.medicationDetails.data.DateAsserted ? new Date(this.medicationDetails.data.DateAsserted) : null,
        InformationSource: this.FB.array([]),
        Subject: this.medicationDetails.data.Subject,
        DerivedFrom: this.medicationDetails.data.DerivedFrom,
        Taken: this.medicationDetails.data.Taken,
        ReasonNotTaken: this.medicationDetails.data.ReasonNotTaken,
        ReasonCode: this.medicationDetails.data.ReasonCode,
        ReasonReference: this.medicationDetails.data.ReasonReference,
        Note: this.medicationDetails.data.Note,
        Dosage: this.medicationDetails.data.Dosage,
      });
      this.setInformationSource();
      if (this.medicationDetails.data.Taken == 289) {
        this.selectedTaken = true;
        this.selectedReasonNotTaken = false;
      } if (this.medicationDetails.data.Taken == 290) {
        this.selectedReasonNotTaken = true;
        this.selectedTaken = false;
      }
      else if (this.medicationDetails.data.Taken == '') {
        this.selectedReasonNotTaken = false;
        this.selectedTaken = false;
      }
      if (this.medicationDetails.mode == 'readOnly') {
        this.emrMedicationdetailsForm.disable();
      }
    }

  }

  private showSuccess(msg) {
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
    this.emrMedicationdetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      if (val == "203")
        this.emrMedicationdetailsForm.get("SourceID").enable();
      else
        this.emrMedicationdetailsForm.get("SourceID").disable();
    });
    this.emrMedicationdetailsForm.get("Taken").valueChanges.subscribe((val) => {
      if (val == 289) {
        this.selectedTaken = true;
        this.selectedReasonNotTaken = false;
      } if (val == 290) {
        this.selectedReasonNotTaken = true;
        this.selectedTaken = false;
      }
      else if (val == '') {
        this.selectedReasonNotTaken = false;
        this.selectedTaken = false;
      }
    });
  }

  public initializeAllDropDown(data) {
    this.medicationDropdown = <MedicationDropDown>{
      sourceTypes: data.filter(r => r.CategoryId == '11'),
      status: data.filter(r => r.CategoryId == '38'),
      category: data.filter(r => r.CategoryId == '39'),
      taken: data.filter(r => r.CategoryId == '30'),
      nottaken: data.filter(r => r.CategoryId == '171'),
    }
  }

  selectAll() {
    for (var i = 0; i < this.medList.length; i++) {
      this.medList[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.medList.every(item => item.selected)
  }

  medicationPage() {
    this.medicationScreen = true;
    if (this.medicationDetails) {
      console.log(this.medicationDetails.data.Medication)
      let data = JSON.parse(this.medicationDetails.data.Medication);
      data.map(a => {
        this.medList.map(r => {
          if (r.Id == a) {
            r.selected = true;
            this.selectedAll = this.medList.every(r => r.selected)
          }
          if (!r.Id == a) {
            this.saveMedicationScreen()
          }
        })
      })
    }
  }

  setInformationSource() {
    var control = <FormArray>this.emrMedicationdetailsForm.controls['InformationSource'];
    let info = JSON.parse(this.medicationDetails.data.InformationSource);
    let index = 0; // or 1 or 2
    info.map(x => {
      control.push(this.FB.group({ Date: new Date(x.Date), Note1: x.Note1 }))
    })
  }

  private createMedicationInformation() {
    return this.FB.group({
      Date: [''],
      Note1: [''],
    });
  }

  public get periodNote(): FormArray {
    return <FormArray>this.emrMedicationdetailsForm.controls['InformationSource'];
  }

  addDatePeriod(): void {
    this.periodNote.push(this.createMedicationInformation());
  }

  deleteDetails(i) {
    this.periodNote.removeAt(i);
  }

  private getMedicationLinks() {
    this.emrService.getTotalMedication()
      .subscribe(medicationLists => {
        this.medList = medicationLists.Body.Data.MedicationList
      })
  }

  saveMedicationScreen(){
    var form = this.emrMedicationdetailsForm.value;
    var selectedIds = this.medList.filter(item => item.selected);
    var selectedIdsArray = [];
    selectedIds.forEach(item => {
      selectedIdsArray.push(item.Id);
    })
    form.Medicationx = selectedIdsArray;
    this.medicationStage = JSON.stringify(selectedIdsArray);
    this.medicationScreen = false;
  }
}
