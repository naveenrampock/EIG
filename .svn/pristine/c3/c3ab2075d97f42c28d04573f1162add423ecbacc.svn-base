import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { EmrService } from '../../emr.service';
import { DatePipe } from '@angular/common';
// import { CaseManagementService } from '../../../case-management/case-management.service';
@Component({
  selector: 'app-condition-details',
  templateUrl: './condition-details.component.html',
  styleUrls: ['./condition-details.component.css']
})
export class ConditionDetailsComponent implements OnInit {

  encounterlink: boolean = true;
  diagnosticAssesment: any;
  contextData: string;
  observationStage: any;
  selectedAllDiagnostic: any;
  selectedAllEncounter: any;
  isReadOnly: boolean = false;
  contactsLists: any;
  observationScreen: boolean = false;
  listEmrObservation: any;
  @Input() conditionDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  uID = Cookie.get('userID');
  id = Cookie.get('Id');
  uType = Cookie.get('userType');
  conditionForm: FormGroup;
  sourceDrp: Array<any> = [];
  clinicalDrp: Array<any> = [];
  verificationDrp: Array<any> = [];
  conditionDrp: Array<any> = [];
  severityDrp: Array<any> = [];
  codeDrp: Array<any> = [];
  msgs: any[];
  IsHidden: boolean = false;
  diagnosticScreen: boolean = false;
  diagnosticList: any;
  selectedAll: any;
  pageNo: number;
  totalcount: any;
  emrEncounterLists: any;
  encounterScreen: boolean = false;
  eviCd: any;
  stage: any;
  selectsummery: any;
  selectevidenceCode: any;
  selectedSeverity: any;
  selectedBodySite: any;
  selectedCode: any;
  selectedCategory: any;
  selectedVerificationStatus: any;
  selectedClinicalStatus: any;
  selectedText: any;
  expCode: any;
  summary: any;
  bodysite: any;
  gUid = Cookie.get('userID');
  public minSDate = new Date();


  constructor(private _FB: FormBuilder, private conditionService: EmrService) { 
    this.minSDate.setDate(this.minSDate.getDate());
  }

  ngOnInit() {
    this.getEmrEncounterList();
    this.conditionFormData();
    this.getAllDropdowns();
    this.getDiagnosticList();
    this.getEmrObservationList();
    this.allDropDown();
    this.userLists();
    this.conditionForm.get("sourceType").valueChanges.subscribe((val) => {
      if (val == "203")
        this.conditionForm.get("sourceId").enable();
      else
        this.conditionForm.get("sourceId").disable();
    });
    if(this.conditionDetails) {
    if( this.conditionDetails.mode == 'readOnly' ) {
      this.encounterlink = false;
    } else {
      this.encounterlink = true;
    }
  }
  }

  conditionFormData() {

    if (!this.conditionDetails) {
      this.conditionForm = this._FB.group({
        patientId: [this.id],
        sourceType: ['', Validators.required],
        sourceId: [{ value: '', disabled: true }],
        createdBy: [this.id],
        clinicalStatus: ['', Validators.required],
        verificationStatus: ['', Validators.required],
        category: ['', Validators.required],
        severity: ['', Validators.required],
        code: ['', Validators.required],
        bodySite: [],
        subject: [],
        context: [],
        onSet: [],
        abatement: [],
        assertedDate: [null],
        asserter: [],
        stage: this._FB.group({ summery: [], assessment: [] }, Validators.required),
        evidence: this._FB.group({ evidenceCode: [], evidenceDetail: [], }),
        note: [],
        name: ['', Validators.required],
      });
      this.conditionForm.get('sourceType').setValue('202');
    } else {
      this.stage = JSON.parse(this.conditionDetails.data.Stage);
      this.eviCd = JSON.parse(this.conditionDetails.data.Evidence);
      this.isReadOnly = true;

      this.conditionForm = this._FB.group({
        patientId: [this.conditionDetails.data.PatientID],
        sourceType: [this.conditionDetails.data.SourceType, Validators.required],
        sourceId: [{ value: this.conditionDetails.data.SourceID, disabled: true }],
        createdBy: [this.id],
        clinicalStatus: [this.conditionDetails.data.ClinicalStatus, Validators.required],
        verificationStatus: [this.conditionDetails.data.VerificationStatus, Validators.required],
        category: [this.conditionDetails.data.Category, Validators.required],
        severity: [this.conditionDetails.data.Severity, Validators.required],
        code: [this.conditionDetails.data.Code, Validators.required],
        bodySite: [this.conditionDetails.data.BodySite],
        subject: [this.conditionDetails.data.Subject],
        context: [this.conditionDetails.data.Context],
        onSet: [this.conditionDetails.data.onSet],
        abatement: [this.conditionDetails.data.Abatement],
        assertedDate: [new Date(this.conditionDetails.data.AssertedDate)],
        asserter: [this.conditionDetails.data.Asserter],
        stage: this._FB.group({ summery: this.stage.summery, assessment: this.stage.assessment }, Validators.required),
        evidence: this._FB.group({ evidenceCode: this.eviCd.evidenceCode, evidenceDetail: this.eviCd.evidenceDetail, }),
        note: [this.conditionDetails.data.Note],
        name: [this.conditionDetails.data.Name, Validators.required],
        id: [this.conditionDetails.data.Id]
      });
      if (this.conditionDetails.mode == 'readOnly') {
        this.conditionForm.disable();
      }
      if (this.conditionDetails.data.SourceType === "203") {
        this.conditionForm.get("sourceId").enable();
      }
      else {
        this.conditionForm.get("sourceId").disable();
      }
    }
  }

  insertCondition(data) {
    data.context = this.contextData;
    data.stage.assessment = null;
    let diagnostic = null;
    if(this.diagnosticAssesment) {
       diagnostic = this.diagnosticAssesment;
    }
    let observation = null;
    if(this.observationStage) {
      observation = this.observationStage;
    }
    var merged = {diagnostic,observation};
    data.stage.assessment = merged;
    data.assertedDate = new DatePipe('en').transform(data.assertedDate, 'yyyy-MM-dd');
    this.conditionService.insertCondition(data)
      .subscribe((res) => {
        this.showSuccess(res.Header.Message);
        setTimeout(() => {
          this.backToListing();
        }, 1000);
      })
  }

  updateCondition(data) {
    data.stage.assessment = this.stage.assessment;
    let diagnostic = this.stage.assessment.diagnostic;
    if(this.diagnosticAssesment) {
       diagnostic = this.diagnosticAssesment;
    }
    let observation = this.stage.assessment.observation;
    if(this.observationStage) {
      observation = this.observationStage;
    }
    var merged = {diagnostic,observation};
    data.stage.assessment = merged;
    data.assertedDate = new DatePipe('en').transform(data.assertedDate, 'yyyy-MM-dd ');
    this.conditionService.updateCondition(data)
      .subscribe((res) => {
        this.showSuccess(res.Header.Message);
        setTimeout(() => {
          this.backToListing();
        }, 1000);
      })
  }

  backToListing() {
    this.goListingPage.emit('');
  }

  showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  searchDropDown(Id, desc) {
    let params = { Id, desc: desc }
    this.conditionService.getDropDown(params)
      .subscribe((res) => {
        var data = res.Body.Data.filter(
          item => item.Description.toLowerCase().indexOf(desc.toLowerCase()) == 0
        );
        if (data == '') {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'There is no values for this character, please enter other character' }];
        }
        this.IsHidden = true;
        this.codeDrp = data.filter(r => r.CategoryId == '67');
        this.bodysite = data.filter(r => r.CategoryId == '68');
        this.summary = data.filter(r => r.CategoryId == '69');
        this.expCode = data.filter(r => r.CategoryId == '163');
      })
  }

  getAllDropdowns() {
    if (this.conditionDetails) {
      this.selectedText = this.conditionDetails.data.SourceType;
      this.selectedClinicalStatus = this.conditionDetails.data.ClinicalStatus;
      this.selectedVerificationStatus = this.conditionDetails.data.VerificationStatus;
      this.selectedCategory = this.conditionDetails.data.Category;
      this.selectedCode = this.conditionDetails.data.Code;
      this.selectedBodySite = this.conditionDetails.data.BodySite;
      this.selectedSeverity = this.conditionDetails.data.Severity;
      this.selectevidenceCode = this.eviCd.evidenceCode;
      this.selectsummery = this.stage.summery;
    }
  }

  getValue(item) {
    this.IsHidden = false;
    if (item.CategoryId == 67) {
      this.selectedCode = item.Description;
    }
    if (item.CategoryId == 68) {
      this.selectedBodySite = item.Description;
    }
    if (item.CategoryId == 69) {
      this.selectsummery = item.Description;
    }
    if (item.CategoryId == 163) {
      this.selectevidenceCode = item.Description;
    }
  }

  encounterPage() {
    this.encounterScreen = true;
    if (this.conditionDetails) {
      let data = JSON.parse(this.conditionDetails.data.Context);
      console.log(data);
      data.map(a => {
        this.emrEncounterLists.map(r => {
          if (r.Id == a) {
            console.log(r.Id);
            r.selected = true;
            this.selectedAllEncounter = this.emrEncounterLists.every(r => r.selected)
          }
          if (!r.Id == a) {
            this.saveEncounterScreen()
          }
        })
      })
    }
  }

  getEmrEncounterList() {
    let params = { 'Id': this.id, pageNo: this.pageNo, pageSize: 10 }
    this.conditionService.getEmrEncounterListBy(params)
      .subscribe(res => {
        this.emrEncounterLists = res.Body.Data.Items;
        this.totalcount = res.Body.Data.TotalItemCount;
      })
  }

  selectAll() {
    for (var i = 0; i < this.listEmrObservation.length; i++) {
      this.listEmrObservation[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.listEmrObservation.every(item => item.selected)
  }

  selectAllEncounter() {
    for (var i = 0; i < this.emrEncounterLists.length; i++) {
      this.emrEncounterLists[i].selected = this.selectedAllEncounter;
    }
  }

  checkIfAllEncounterSelected() {
    this.selectedAllEncounter = this.emrEncounterLists.every(item => item.selected)
  }

  selectAllDiagnostic() {
    for (var i = 0; i < this.diagnosticList.length; i++) {
      this.diagnosticList[i].selected = this.selectedAllDiagnostic;
    }
  }

  checkIfAllDiagnsticSelected() {
    this.selectedAllDiagnostic = this.diagnosticList.every(item => item.selected)
  }

  getDiagnosticList() {
    const data = { Id: this.id, pageNo: this.pageNo, pageSize: 10 }
    this.conditionService.getDiagnosticList(data)
      .subscribe((res) => {
        this.diagnosticList = res.Body.Data.conditionList;
        this.totalcount = res.Body.Data.TotalItemCount;
      })
  }

  diagnosticReport() {
    this.diagnosticScreen = true;
    if (this.conditionDetails) {
      let data = (JSON.parse(this.conditionDetails.data.Stage).assessment).diagnostic;
      console.log(data);
      data.map(a => {
        this.diagnosticList.map(r => {
          if (r.Id == a) {
            r.selected = true;
            this.selectedAllDiagnostic = this.diagnosticList.every(r => r.selected)
          }
          if (!r.Id == a) {
            this.saveObservationScreen()
          }
        })
      })
    }
  }

  getEmrObservationList() {
    let params = { 'Id': this.id, PageNo: 1, PageSize: 10 }
    this.conditionService.getEmrObservation(params)
      .subscribe(observationLists => {
        this.listEmrObservation = observationLists.Body.Data.Items;
        this.totalcount = observationLists.Body.Data.TotalItemCount;
      })
  }

  observationPage() {
    this.observationScreen = true;
    if (this.conditionDetails) {
      let data = (JSON.parse(this.conditionDetails.data.Stage).assessment).observation;
      data.map(a => {
        this.listEmrObservation.map(r => {
          if (r.Id == a) {
            r.selected = true;
            this.selectedAll = this.listEmrObservation.every(r => r.selected)
          }
          if (!r.Id == a) {
            this.saveObservationScreen()
          }
        })
      })
    }
  }

  allDropDown() {
    let params = { Id: "11,64,145,65,66", desc: null }
    this.conditionService.getDropDown(params)
      .subscribe((res) => {
        this.sourceDrp = res.Body.Data.filter(r => r.CategoryId == '11');
        this.clinicalDrp = res.Body.Data.filter(r => r.CategoryId == '64');
        this.verificationDrp = res.Body.Data.filter(r => r.CategoryId == '145');
        this.conditionDrp = res.Body.Data.filter(r => r.CategoryId == '65');
        this.severityDrp = res.Body.Data.filter(r => r.CategoryId == '66');
      })
  }

  userLists() {
    
    this.conditionService.getMyContacts(this.gUid,0,1,null,this.uID)
      .subscribe(
        myContacts => {
          this.contactsLists = myContacts.Body.Data.Item;
        })
  }

  saveObservationScreen() {
    var form = this.conditionForm.value;
    var selectedIds = this.listEmrObservation.filter(item => item.selected == true);
    var selectedIdsArray = [];
    selectedIds.forEach(item => {
      selectedIdsArray.push(item.Id);
    })
    form.stage.assessment = selectedIdsArray;
    this.observationStage =   selectedIdsArray;
    form.stage.summery = this.selectsummery;
    this.observationScreen = false;
  }

  saveDiagnosticScreen() {
    var form = this.conditionForm.value;
    var selectedIds = this.diagnosticList.filter(item => item.selected == true);
    var selectedIdsArray = [];
    selectedIds.forEach(item => {
      selectedIdsArray.push(item.Id);
    })
    form.stage.assessment = selectedIdsArray;
    this.diagnosticAssesment = selectedIdsArray;
    form.stage.summery = this.selectsummery;
    this.diagnosticScreen = false;
  }

  saveEncounterScreen() {
    var form = this.conditionForm.value;
    var selectedIds = this.emrEncounterLists.filter(item => item.selected == true);
    var selectedIdsArray = [];
    selectedIds.forEach(item => {
      selectedIdsArray.push(item.Id);
    })
    form.context = JSON.stringify(selectedIdsArray);
    this.contextData = JSON.stringify(selectedIdsArray);
    this.encounterScreen = false;
  }

}

