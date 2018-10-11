import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.css']
})
export class ProcedureDetailsComponent implements OnInit {

  selectedAllDiagnostic: any;
  selectedAllCondition: any;
  selectedAllObservation: any;
  selectedAllEncounter: any;
  context:any;
  conditionList: any;
  emrEncounterLists: any;
  diagnosticList: any;
  listEmrObservation: any;
  conditionScreen: boolean = false;
  observationScreen: boolean = false;
  diagnosticScreen: boolean = false;
  encounterScreen: boolean = false;
  selectedComplication: any;
  selectedOutcome: any;
  selectedBodySite: any;
  selectedFollowUp: any;
  followUp: any;
  selectedReasonCode: any;
  selectedStatus: any;
  selectedCode: any;
  selectedCategory: any;
  selectedText: any;
  complication: any;
  outcome: any;
  bodySite: any;
  reasonCode: any;
  code: any;
  category: any;
  @Input() ProcedureDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  emrProcedureDetailsForm: FormGroup;
  userId = Cookie.get('Id');
  msgs: any[];
  sourceTypes: any;
  appointmentStatus: any;
  IsHidden: boolean = false;
  isChecked: boolean = false;

  constructor(private FB: FormBuilder, private emrService: EmrService) {
   
   }

  ngOnInit() {
    this.ProcedureFormInit();
    this.getAllDropdowns();
    this.getEmrObservationList();
    this.getDiagnosticList();
    this.getConditionList();
    this.allDropDown();
    this.getEmrEncounterList();
    this.addDetails();
    this.ProcedureDetails;
  }

  backToListing() {
    this.goListingPage.emit();
  }
  sourceTypeValidation() {
    this.emrProcedureDetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      console.log(val);
      if (val == "203") {
        this.emrProcedureDetailsForm.get("SourceId").enable();
      }
      else {
        this.emrProcedureDetailsForm.get("SourceId").disable();
      }
    });
  }

  private ProcedureFormInit() {
    // Edit
    if (this.ProcedureDetails) {
      let PerformedData = JSON.parse(this.ProcedureDetails.data.Performed);
      this.emrProcedureDetailsForm = this.FB.group({
        Id: this.ProcedureDetails.data.Id,
        PatientId: this.ProcedureDetails.data.PatientId,
        SourceType: [this.ProcedureDetails.data.SourceType, Validators.required],
        SourceId: [{ value: this.ProcedureDetails.data.SourceId, disabled: true }, Validators.required],
        Creator: [this.ProcedureDetails.data.CreatedBy, Validators.required],
        Definition: [this.ProcedureDetails.data.Definition, Validators.required],
        BasedOn: [this.ProcedureDetails.data.BasedOn, Validators.required],
        Appointment: this.ProcedureDetails.data.Appointment,
        PartOf: [this.ProcedureDetails.data.PartOf, Validators.required],
        Status: [this.ProcedureDetails.data.Status, Validators.required],
        Category: [this.ProcedureDetails.data.Category, Validators.required],
        Code: this.ProcedureDetails.data.Code,
        Subject: this.ProcedureDetails.data.Subject,
        Context: this.ProcedureDetails.data.Context,
        Location: this.ProcedureDetails.data.Location,
        ReasonCode: this.ProcedureDetails.data.ReasonCode,
        ReasonReference: this.ProcedureDetails.data.ReasonReference,
        BodySite: this.ProcedureDetails.data.BodySite,
        Outcome: this.ProcedureDetails.data.Outcome,
        Report: this.ProcedureDetails.data.Report,
        Complication: this.ProcedureDetails.data.Complication,
        ComplicationDetail: this.ProcedureDetails.data.ComplicationDetail,
        FollowUp: this.ProcedureDetails.data.FollowUp,
        Note: this.ProcedureDetails.data.Note,
        FocalDevice: this.ProcedureDetails.data.FocalDevice,
      });
      this.sourceTypeValidation();
      if (this.ProcedureDetails.mode == 'readOnly') {
        this.emrProcedureDetailsForm.disable();
      }
    }
    else {
      this.emrProcedureDetailsForm = this.FB.group({
        Id: 0,
        PatientId: this.userId,
        SourceType: ['', Validators.required],
        SourceId: [{ value: '', disabled: true }],
        Creator: this.userId,
        Definition: [null, Validators.required],
        BasedOn: [null, Validators.required],
        PartOf: [null, Validators.required],
        Status: ['', Validators.required],
        Category: [null, Validators.required],
        Code: null,
        Subject: null,
        Context: null,
        Performed: this.FB.array([]),
        Location: null,
        ReasonCode: null,
        ReasonReference: null,
        BodySite: null,
        Outcome: null,
        Report: null,
        Complication: null,
        ComplicationDetail: null,
        FollowUp: null,
        Note: null,
        FocalDevice: null,
      });
      this.sourceTypeValidation();
      this.Performed.controls = [];
    }
    
  }

  saveEmrProcedure() {
    let date = new DatePipe('en');
    let addParams = this.emrProcedureDetailsForm.value;
    //  addParams.PerformedParent = JSON.stringify(addParams.PerformedParent);
    //  itemguarantor.Birthdate = birthday.transform(itemguarantor.Birthdate, 'yyyy-MM-dd');
    console.log(addParams);
    // let from = new DatePipe('en').transform(addParams.Period[0], 'yyyy-MM-dd');
    // let to = new DatePipe('en').transform(addParams.Period[1], 'yyyy-MM-dd');
    // addParams.Period = { from, to };
     addParams.Context = this.context;
    this.emrService.addEmrProcedure(addParams).subscribe(res => {
      if (res.Header.Success) {
        this.showSuccess(res.Header.Message)
        setTimeout(() => {
          this.backToListing();
        }, 1000);
      }
    })
  }

  updateEmrProcedure() {
    let updateParams = this.emrProcedureDetailsForm.value;
    this.emrService.updateEmrProcedure(updateParams).subscribe(res => {
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
        console.log(res);
        this.IsHidden = true;
        this.sourceTypes = res.Body.Data.filter(r => r.CategoryId == '11');
        this.appointmentStatus = res.Body.Data.filter(r => r.CategoryId == '73');

        this.code = res.Body.Data.filter(r => r.CategoryId == '81');
        this.reasonCode = res.Body.Data.filter(r => r.CategoryId == '75');
        this.bodySite = res.Body.Data.filter(r => r.CategoryId == '76');

        this.complication = res.Body.Data.filter(r => r.CategoryId == '169');
        this.followUp = res.Body.Data.filter(r => r.CategoryId == '79');
      })
  }

  getAllDropdowns() {
    if (this.ProcedureDetails) {
      this.selectedText = this.ProcedureDetails.data.SourceType;
      this.selectedCategory = this.ProcedureDetails.data.Category;
      this.selectedCode = this.ProcedureDetails.data.Code;
      this.selectedStatus = this.ProcedureDetails.data.Status;
      this.selectedReasonCode = this.ProcedureDetails.data.ReasonCode;
      this.selectedFollowUp = this.ProcedureDetails.data.FollowUp;
      this.selectedBodySite = this.ProcedureDetails.data.BodySite;
      this.selectedOutcome = this.ProcedureDetails.data.Outcome,
      this.selectedComplication = this.ProcedureDetails.data.Complication;
    }
    console.log(this.selectedComplication);
  }

  getValue(item) {
    this.IsHidden = false;
    console.log(item);
    if (item.CategoryId == 81) {
      this.selectedCode = item.Description;
    }
    if (item.CategoryId == 73) {
      this.selectedStatus = item.Description;
    }
    if (item.CategoryId == 75) {
      this.selectedReasonCode = item.Description;
    }
    if (item.CategoryId == 76) {
      this.selectedBodySite = item.Description;
    }
    if (item.CategoryId == 169) {
      this.selectedComplication = item.Description;
    }
    if (item.CategoryId == 79) {
      this.selectedFollowUp = item.Description;
    }
  }

  encounter() {
    this.encounterScreen = true;
  }

  diagnostic() {
    this.diagnosticScreen = true;
  }

  condition() {
    this.conditionScreen = true;
  }

  observation() {
    this.observationScreen = true;
  }

  public getEmrObservationList() {
    let params = { 'Id': this.userId, PageNo: 1, PageSize: 10 }
    this.emrService.getEmrObservation(params)
      .subscribe(observationLists => {
        console.log(observationLists);
        this.listEmrObservation = observationLists.Body.Data.Items;
      })
  }

  getDiagnosticList() {
    const data = { Id: this.userId, pageNo: 1, pageSize: 10 }
    console.log(data);
    this.emrService.getDiagnosticList(data)
      .subscribe((res) => {
        this.diagnosticList = res.Body.Data.conditionList;
        console.log(this.diagnosticList)
      })
  }

  getEmrEncounterList() {
    let params = { 'Id': this.userId, pageNo: 1, pageSize: 10 }
    this.emrService.getEmrEncounterListBy(params)
      .subscribe(res => {
        this.emrEncounterLists = res.Body.Data.Items;
      })
  }

  getConditionList() {
    const data = { Id: this.userId, pageNo: 1, pageSize: 10 }
    this.emrService.getCondition(data)
      .subscribe((res) => {
        this.conditionList = res.Body.Data.conditionList;
      })
  }

  private allDropDown() {
    let params = { Id: "11,146,77", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.sourceTypes = res.Body.Data.filter(r => r.CategoryId == '11');
        this.category = res.Body.Data.filter(r => r.CategoryId == '146');
        this.outcome = res.Body.Data.filter(r => r.CategoryId == '77');
      })
  }

  public addDetails() {
    console.log("working");
    this.Performed.push(this.createPreferredInformation());
    console.log(this.Performed,"this.Performed");
  }

  public deleteDetails(i) {
    this.Performed.removeAt(i);
  }


  public preventCommunicationEmpty() {
    if (!this.Performed.length) {
      let group = this.createPreferredInformation();
      group.reset();
      this.emrProcedureDetailsForm.setControl('Performed', this.FB.array([group]));
    }
  }

  public get Performed(): FormArray {
    return <FormArray>this.emrProcedureDetailsForm.controls['Performed'];
  }
  private createPreferredInformation() {
    return this.FB.group({
      PerformedDateTime: [''],
      Performed: [''],
    });
  }

  selectAllEncounter() {
    for (var i = 0; i < this.emrEncounterLists.length; i++) {
      this.emrEncounterLists[i].selected = this.selectedAllEncounter;
    }
  }

  checkIfAllEncounterSelected() {
    this.selectedAllEncounter = this.emrEncounterLists.every(item => item.selected === "true");
    console.log(this.selectedAllEncounter);

  }

  selectAllObservation() {
    for (var i = 0; i < this.listEmrObservation.length; i++) {
      this.diagnosticList[i].selected = this.selectedAllObservation;
    }
  }

  checkIfAllObservationSelected() {
    this.selectedAllObservation = this.diagnosticList.every(item => item.selected == "true")
  }

  selectCondition() {
    for (var i = 0; i < this.conditionList.length; i++) {
      this.conditionList[i].selected = this.selectedAllCondition;
    }
  }

  checkIfAllConditionSelected() {
    this.selectedAllCondition = this.conditionList.every(item => item.selected == "true")
  }

  selectDiagnostic() {
    for (var i = 0; i < this.diagnosticList.length; i++) {
      this.diagnosticList[i].selected = this.selectedAllDiagnostic;
    }
  }

  checkIfAllDiagnsticSelected() {
    this.selectedAllDiagnostic = this.diagnosticList.every(item => item.selected == "true")
  }

  saveEncounterScreen() {
    var seletedIds = this.emrEncounterLists.filter(item => item.selected == true);
    var selectedIdsArray = [];
    seletedIds.forEach(item => {
      selectedIdsArray.push(item.Id)
    })
    console.log(selectedIdsArray)
    this.emrProcedureDetailsForm.value.Context = JSON.stringify(selectedIdsArray);
    this.context = JSON.stringify(selectedIdsArray);

    this.encounterScreen = false;
    
  }

  saveDiagnosticScreen(){
    var selectedIds = this.diagnosticList.filter(item=>item.selected == true);
    var selectedIdsArray = [];
    selectedIds.forEach(item=>{
      selectedIdsArray.push(item.Id)
    })
    console.log(selectedIdsArray)
    this.emrProcedureDetailsForm.value.Report = JSON.stringify(selectedIdsArray)
  }

}
