import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-encounter-details',
  templateUrl: './encounter-details.component.html',
  styleUrls: ['./encounter-details.component.css']
})
export class EncounterDetailsComponent implements OnInit {
  encounterlink: boolean = true;
  diagnosisCondition: string;
  selectRole: any;
  selectedAll: any;
  appointmentRole: any;
  period: any;
  isReadOnly: boolean = false;
  conditionScreen: boolean = false;
  conditionList: any;
  pageNo: any;
  selectedDischargeDisposition: any;
  selectedSpecialArrangement: any;
  selectedSpecialCourtesy: any;
  selectedDietPreference: any;
  selectedReAdmission: any;
  hospitalization: any;
  selectedAdmitSource: any;
  selectedReason: any;
  selectedPriority: any;
  selectedType: any;
  selectedStatus: any;
  selectedText: any;
  dischargeDisposition: any;
  specialArrangement: any;
  specialCourtesy: any;
  dietPreference: any;
  readmission: any;
  admitSource: any;
  reason: any;
  priority: any;
  type: any;
  start: any;
  @Input() encounterDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  emrEncounterDetailsForm: FormGroup;
  userId = Cookie.get('Id');
  msgs: any[];
  sourceTypes: any;
  appointmentStatus: any;
  IsHidden: boolean = false;
  public dateTime = new Date();
  public minSDate: Date = new Date(Date.now());

  constructor(private FB: FormBuilder, private emrService: EmrService) {
    this.dateTime.setDate(this.dateTime.getDate());
  }

  ngOnInit() {
    this.EncounterFormInit();
    this.getAllDropdowns();
    this.getConditionList();
    this.allDropDown();
    if( this.encounterDetails.mode == 'readOnly' ) {
      this.encounterlink = false;
    } else {
      this.encounterlink = true;
    }
  }

  backToListing() {
    this.goListingPage.emit('');
  }
  sourceTypeValidation() {
    this.emrEncounterDetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      if (val == "203") {
        this.emrEncounterDetailsForm.get("SourceID").enable();
      }
      else {
        this.emrEncounterDetailsForm.get("SourceID").disable();
      }
    });
  }


  EncounterFormInit() {
    // Edit
    console.log(this.encounterDetails);
    if (this.encounterDetails) {
      let location = JSON.parse(this.encounterDetails.data.Location);
      this.hospitalization = JSON.parse(this.encounterDetails.data.Hospitalization);
      this.isReadOnly = true;
      let diagnosis = JSON.parse(this.encounterDetails.data.Diagnosis);
      console.log(diagnosis.Condition)
      this.selectRole = diagnosis.Role;
      this.emrEncounterDetailsForm = this.FB.group({
        Id: this.encounterDetails.data.Id,
        PatientId: this.encounterDetails.data.PatientId,
        SourceType: [this.encounterDetails.data.SourceType, Validators.required],
        SourceID: [{ value: this.encounterDetails.data.SourceId, disabled: true }, Validators.required],
        Creator: [this.encounterDetails.data.CreatedBy, Validators.required],
        Status: [this.encounterDetails.data.STATUS, Validators.required],
        Type: [this.encounterDetails.data.Type, Validators.required],
        Priority: [this.encounterDetails.data.Priority, Validators.required],
        Appointment: [this.encounterDetails.data.Appointment],
        PeriodStart: [new Date(this.encounterDetails.data.PeriodStart), Validators.required],
        PeriodEnd: [new Date(this.encounterDetails.data.PeriodEnd), Validators.required],
        Length: this.encounterDetails.data.LENGTH,
        Reason: this.encounterDetails.data.Reason,
        Diagnosis: this.FB.group({
          Condition: diagnosis.Condition,
          Role: diagnosis.Role,
        }),
        Hospitalization: this.FB.group({
          Origin: this.hospitalization.Origin,
          AdmitSource: this.hospitalization.AdmitSource,
          ReAdmission: this.hospitalization.ReAdmission,
          DietPreference: this.hospitalization.DietPreference,
          SpecialCourtesy: this.hospitalization.SpecialCourtesy,
          SpecialArrangement: this.hospitalization.SpecialArrangement,
          DischargeDisposition: this.hospitalization.DischargeDisposition,
        }),
        Location: this.FB.group({
          LocationStatus: location.LocationStatus,
          LocatiionPeriod: location.LocatiionPeriod
        }),
        ServiceProvider: this.encounterDetails.data.ServiceProvider,
      });
      this.sourceTypeValidation();
      if (this.encounterDetails.mode == 'readOnly') {
        this.emrEncounterDetailsForm.disable();
      }
      if (this.encounterDetails.data.SourceType == "203") {
        this.emrEncounterDetailsForm.get("SourceID").enable();
      }
      else {
        this.emrEncounterDetailsForm.get("SourceID").disable();
      }
    }
    else {
      this.emrEncounterDetailsForm = this.FB.group({
        Id: 0,
        PatientId: this.userId,
        SourceType: ['', Validators.required],
        SourceID: [{ value: '', disabled: true }, Validators.required],
        Creator: this.userId,
        Status: ['', Validators.required],
        Type: [null, Validators.required],
        Priority: [null, Validators.required],
        Appointment: [null],
        PeriodStart: [null, Validators.required],
        PeriodEnd: [null, Validators.required],
        Length: null,
        Reason: [null],
        Diagnosis: this.FB.group({
          Condition: null,
          Role: null,
        }),
        Hospitalization: this.FB.group({
          Origin: null,
          AdmitSource: null,
          ReAdmission: null,
          DietPreference: null,
          SpecialCourtesy: null,
          SpecialArrangement: null,
          DischargeDisposition: null,
        }),
        Location: this.FB.group({
          LocationStatus: null,
          LocatiionPeriod: null
        }),
        ServiceProvider: null
      });
      this.sourceTypeValidation();
      this.emrEncounterDetailsForm.get('SourceType').setValue('202');
    }
  }

  saveEmrEncounter() {
    let addParams = this.emrEncounterDetailsForm.value;
    addParams.PeriodStart = new DatePipe('en').transform(addParams.PeriodStart, 'yyyy-MM-dd ')
    addParams.PeriodEnd = new DatePipe('en').transform(addParams.PeriodEnd, 'yyyy-MM-dd ')
    console.log(this.emrEncounterDetailsForm.value.Diagnosis.Condition);
    addParams.Diagnosis.Condition = this.diagnosisCondition;
    this.emrService.addEmrEncounter(addParams).subscribe(res => {
      if (res.Header.Success) {
        this.showSuccess(res.Header.Message)
        setTimeout(() => {
          this.backToListing();
        }, 1000);
      }
    })
  }

  updateEmrEncounter() {
    let updateParams = this.emrEncounterDetailsForm.value;
    updateParams.PeriodStart = new DatePipe('en').transform(updateParams.PeriodStart, 'yyyy-MM-dd ')
    updateParams.PeriodEnd = new DatePipe('en').transform(updateParams.PeriodEnd, 'yyyy-MM-dd ')
    this.emrService.updateEmrEncounter(updateParams).subscribe(res => {
      if (res.Header.Success) {
        this.showSuccess(res.Header.Message)
        setTimeout(() => {
          this.backToListing();
        }, 1000);
      }
    })
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  searchDropDown(Id, desc) {
    let params = { Id, desc: desc }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.IsHidden = true;
        var data = res.Body.Data.filter(
          item => item.Description.toLowerCase().indexOf(desc.toLowerCase()) == 0
        );
        if (data == '') {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'There is no values for this character, please enter other character' }];
        }
        this.priority = data.filter(r => r.CategoryId == '150');
        this.reason = data.filter(r => r.CategoryId == '151');
      })
  }

  getAllDropdowns() {
    if (this.encounterDetails) {
      this.selectedPriority = this.encounterDetails.data.Priority;
      this.selectedReason = this.encounterDetails.data.Reason;
    }
  }

  getValue(item) {
    this.IsHidden = false;
    if (item.CategoryId == 150) {
      this.selectedPriority = item.Description;
    }
    if (item.CategoryId == 151) {
      this.selectedReason = item.Description;
    }
  }

  getConditionList() {
    const data = { Id: this.userId, pageNo: this.pageNo, pageSize: 10 }
    this.emrService.getCondition(data)
      .subscribe((res) => {
        this.conditionList = res.Body.Data.conditionList;
      })
  }

  condition() {
    this.conditionScreen = true;
    if (this.encounterDetails) {
      let condition = JSON.parse(JSON.parse(this.encounterDetails.data.Diagnosis).Condition)
      console.log(condition);
      condition.map(a => {
        this.conditionList.map(r => {
          if (r.Id == a) {
            r.selected = true;
            this.selectedAll = this.conditionList.every(item => item.selected)
          }
          if (!r.Id == a) {
            this.saveConditionScreen();
          }
        })
      })
    }
  }

  private allDropDown() {
    let params = { Id: "11,149,148,172", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.sourceTypes = res.Body.Data.filter(r => r.CategoryId == '11');
        this.type = res.Body.Data.filter(r => r.CategoryId == '149');
        this.appointmentStatus = res.Body.Data.filter(r => r.CategoryId == '148');
        this.appointmentRole = res.Body.Data.filter(r => r.CategoryId == '172');
      })
  }

  selectAll() {
    for (var i = 0; i < this.conditionList.length; i++) {
      this.conditionList[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.conditionList.every(item => item.selected)
  }

  saveConditionScreen() {
    var selectedIds = this.conditionList.filter(item => item.selected);
    var selectedIdsArray = [];
    selectedIds.forEach(item => {
      selectedIdsArray.push(item.Id);
    })
    console.log(selectedIdsArray)
    this.emrEncounterDetailsForm.value.Diagnosis.Condition = JSON.stringify(selectedIdsArray);
    this.diagnosisCondition = JSON.stringify(selectedIdsArray);
    this.conditionScreen = false;
    console.log(this.diagnosisCondition)
  }
}