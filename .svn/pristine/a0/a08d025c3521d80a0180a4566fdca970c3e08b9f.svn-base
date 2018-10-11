import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { DatePipe } from '@angular/common';
import { ObservationDropDown, ObservationSelectDropDown } from './observation-details.models';

@Component({
  selector: 'app-observation-details',
  templateUrl: './observation-details.component.html',
  styleUrls: ['./observation-details.component.css']
})
export class ObservationDetailsComponent implements OnInit {

  devicelink: boolean = true;
  deviceData: string;
  deviceScreen: boolean = false;
  listEmrDevice: any;
  pageNo: any;
  selectedAll: any;
  listEmrObservation: any;
  selectedAllEncounter: any;
  emrEncounterLists: any;
  contextData: string;
  encounterScreen: boolean = false;
  component: any;
  selectedCompCode:any = [];
  value: any;
  selectedBodySite: any;
  selectedMethod: any;
  selectedValueBoolean: any;
  selectedInterpretation: any;
  selectedDataAbsentReason: any;
  selectedCode: any;
  selectedCategory: any;
  selectedStatus: any;
  selectedText: any;
  encounterlink: boolean = true;
  isReadOnly: boolean = false;
  public contactIndex: any;
  @Input() observationDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  public emrObservationdetailsForm: FormGroup;
  public msgs: any[] = [];
  public IsHidden: boolean = false;
  public observationDropdown: ObservationDropDown = <ObservationDropDown>{};
  public observationSelectDropdown: ObservationSelectDropDown = <ObservationSelectDropDown>{};
  private userId = Cookie.get('Id');
  public dateTime = new Date();
  public yesterday = new Date();

  constructor(private FB: FormBuilder, private emrService: EmrService) {
    this.dateTime.setDate(this.dateTime.getDate());
    this.yesterday.setDate(this.yesterday.getDate());
   }

  ngOnInit() {
    this.observationFormInit();
    this.sourceTypeValidation();
    this.getAllDropdowns();
    this.getEmrEncounterList();
    this.allDropdown();
    this.getEmrDeviceList();
    if (this.observationDetails) {
      if (this.observationDetails.mode == 'readOnly') {
        this.encounterlink = false;
        this.devicelink = false;
      } else {
        this.encounterlink = true;
        this.devicelink = true;
      }
    }
  }

  public backToListing(evt) {
    this.goListingPage.emit(evt);
    this.sourceTypeValidation();
  }

  public observationFormInit() {
    //Add
    if (!this.observationDetails) {
      this.emrObservationdetailsForm = this.FB.group({
        ID: 0,
        PatientId: this.userId,
        SourceType: ['', Validators.required],
        SourceId: [{ value: 0, disabled: true }],
        CreatedBy: this.userId,
        BasedOn: [null],
        Status: ['', Validators.required],
        Category: ['', Validators.required],
        Code: ['', Validators.required],
        Subject: [null],
        Context: null,
        Effectivex: this.FB.array([]),
        Issued: null,
        Performer: null,
        ValuexV: this.FB.array([]),
        DataAbsentReason: [''],
        Interpretation: [''],
        Comment: null,
        BodySite: [''],
        Method: [''],
        Specimen: null,
        Device: null,
        ReferenceRange: null,
        Related: null,
        ComponentC: this.FB.array([]),
      });
      this.emrObservationdetailsForm.get('SourceType').setValue('202');
      this.addComponent();
      this.addDatePeriod();
      this.addValue();
    } else {
      // edit
      this.isReadOnly = true;
      this.emrObservationdetailsForm = this.FB.group({
        Id: this.observationDetails.data.Id,
        PatientId: this.observationDetails.data.PatientId,
        SourceType: [this.observationDetails.data.SourceType, Validators.required],
        SourceId: [{ value: this.observationDetails.data.SourceId, disabled: true }],
        CreatedBy: this.userId,
        BasedOn: [this.observationDetails.data.BasedOn],
        Status: [this.observationDetails.data.Status, Validators.required],
        Category: [this.observationDetails.data.Category, Validators.required],
        Code: [this.observationDetails.data.Code, Validators.required],
        Subject: [this.observationDetails.data.Subject],
        Context: this.observationDetails.data.Context,
        Effectivex: this.FB.array([]),
        Issued: this.observationDetails.data.Issued ? new Date(this.observationDetails.data.Issued) : null,
        Performer: this.observationDetails.data.Performer,
        ValuexV: this.FB.array([]),
        Interpretation: [this.observationDetails.data.Interpretation],
        Comment: this.observationDetails.data.Comment,
        BodySite: [this.observationDetails.data.BodySite],
        Method: [this.observationDetails.data.Method],
        Specimen: this.observationDetails.data.Specimen,
        Device: this.observationDetails.data.Device,
        ReferenceRange: this.observationDetails.data.ReferenceRange,
        Related: this.observationDetails.data.Related,
        ComponentC:  this.FB.array([]),
      });
      this.setEffectivex();
      this.setValuex();
      this.setComponent();
      if (this.observationDetails.data.SourceType == "203") {
        this.emrObservationdetailsForm.get("SourceId").enable();
      }
      else {
        this.emrObservationdetailsForm.get("SourceId").disable();
      }
      if (this.observationDetails.mode == 'readOnly') {
        this.emrObservationdetailsForm.disable();
      }
    }
  }

  public saveEmrObservation() {
    let addParams = this.emrObservationdetailsForm.value;
    addParams.Context = this.contextData;
    addParams.Device = this.deviceData;
    addParams.Issued = new DatePipe('en').transform(addParams.Issued, 'yyyy-MM-dd HH:mm:ss');
    addParams.ValuexV = JSON.stringify(this.ValuexV.value);
    addParams.Effectivex = JSON.stringify(this.Effectivex.value);
    addParams.ComponentC = JSON.stringify(this.ComponentC.value);
    this.emrService.addEmrObservation(addParams).subscribe(res => {
      this.successMessagePopup(res);
    })
  }

  public updateEmrObservation() {
    let updateParams = this.emrObservationdetailsForm.value;
    updateParams.Issued = new DatePipe('en').transform(updateParams.Issued, 'yyyy-MM-dd HH:mm:ss');
    updateParams.ValuexV = JSON.stringify(this.ValuexV.value);
    updateParams.Effectivex = JSON.stringify(this.Effectivex.value);
    updateParams.ComponentC = JSON.stringify(this.ComponentC.value);
    this.emrService.updateEmrObservation(updateParams).subscribe(res => {
      this.successMessagePopup(res)
    })
  }

  public searchDropDown(Id, desc,index) {
    let params = { Id, desc: desc }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        console.log(res);
        this.IsHidden = true;
        this.contactIndex = index;
        var data = res.Body.Data.filter(
          item => item.Description.toLowerCase().indexOf(desc.toLowerCase()) == 0
        );
        if (data == '') {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'There is no values for this character, please enter other character' }];
        }
        this.initializeAllDropDown(data)
      })
  }

  public getValue(item,cntrl) {
    this.IsHidden = false;
    if (item.CategoryId == 85) {
      this.selectedCode = item.Description;
    }
    if (item.CategoryId == 87) {
      this.selectedInterpretation = item.Description;
    }
    if (item.CategoryId == 88) {
      this.selectedBodySite = item.Description;
    }
    if (item.CategoryId == 89) {
      this.selectedMethod = item.Description;
    }
    if (item.CategoryId == 94) {
      this.selectedCompCode.push(item)
      this.ComponentC.at(cntrl).get('CCode').setValue(item.Description)
    }
  }

  private getAllDropdowns() {
    if (this.observationDetails) {
      this.selectedCode = this.observationDetails.data.Code;
      this.selectedInterpretation = this.observationDetails.data.Interpretation;
      this.selectedMethod = this.observationDetails.data.Method;
      this.selectedBodySite = this.observationDetails.data.BodySite;
    }
  }

  private initializeAllDropDown(data) {
    this.observationDropdown = <ObservationDropDown>{
      code: data.filter(r => r.CategoryId == '85'),
      interpretation: data.filter(r => r.CategoryId == '87'),
      bodySite: data.filter(r => r.CategoryId == '88'),
      compCode: data.filter(r => r.CategoryId == '94'),
      method: data.filter(r => r.CategoryId == '89'),
    };
  }

  private initializeSelectDropDown(data) {
    this.observationSelectDropdown = <ObservationSelectDropDown>{
      sourceTypes: data.filter(r => r.CategoryId == '11'),
      status: data.filter(r => r.CategoryId == '83'),
      category: data.filter(r => r.CategoryId == '84'),
      dataAbsentReason: data.filter(r => r.CategoryId == '86'),
    }
  }

  private sourceTypeValidation() {
    this.emrObservationdetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      if (val == "203")
        this.emrObservationdetailsForm.get("SourceId").enable();
      else
        this.emrObservationdetailsForm.get("SourceId").disable();
    });
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

  private createEffectiveInformation() {
    return this.FB.group({
      EffectiveDateTime: [''],
      EffectivePeriod: [''],
    });
  }

  public get Effectivex(): FormArray {
    return <FormArray>this.emrObservationdetailsForm.controls['Effectivex'];
  }

  addDatePeriod(): void {
    this.Effectivex.push(this.createEffectiveInformation());
    console.log(this.Effectivex);
  }

  deleteDetails(i) {
    this.Effectivex.removeAt(i);
  }

  private createValueInformation() {
    return this.FB.group({
      ValueString: [''],
      ValueQuantity: [''],
      ValueRange: ['']
    });
  }

  public get ValuexV(): FormArray {
    return <FormArray>this.emrObservationdetailsForm.controls['ValuexV'];
  }

  addValue(): void {
    this.ValuexV.push(this.createValueInformation());
    console.log(this.ValuexV);
  }

  deleteValue(i) {
    this.ValuexV.removeAt(i);
  }

  private createComponentInformation() {
    return this.FB.group({
      DataAbsentReason: [''],
      CCode: [''],
      Interpret: ['']
    });
  }

  public get ComponentC(): FormArray {
    return <FormArray>this.emrObservationdetailsForm.controls['ComponentC'];
  }

  addComponent(): void {
    this.ComponentC.push(this.createComponentInformation());
    console.log(this.ComponentC);
  }

  deleteComponent(i) {
    this.ComponentC.removeAt(i);
  }

  saveEncounterScreen() {
    var form = this.emrObservationdetailsForm.value;
    var selectedIds = this.emrEncounterLists.filter(item => item.selected);
    var selectedIdsArray = [];
    selectedIds.forEach(item => {
      selectedIdsArray.push(item.Id);
    })
    form.Context = JSON.stringify(selectedIdsArray);
    this.contextData = JSON.stringify(selectedIdsArray);
    this.encounterScreen = false;
  }

  saveDeviceScreen() {
    var form = this.emrObservationdetailsForm.value;
    var selectedIds = this.listEmrDevice.filter(item => item.selected);
    var selectedIdsArray = [];
    selectedIds.forEach(item => {
      selectedIdsArray.push(item.Id);
    })
    form.Device = JSON.stringify(selectedIdsArray);
    this.deviceData = JSON.stringify(selectedIdsArray);
    this.deviceScreen = false;
  }

  encounterPage() {
    this.encounterScreen = true;
    if (this.observationDetails) {
      let data = JSON.parse(this.observationDetails.data.Context);
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

  devicePage() {
    this.deviceScreen = true;
    if (this.observationDetails) {
      let data = JSON.parse(this.observationDetails.data.Device);
      console.log(data);
      data.map(a => {
        this.listEmrDevice.map(r => {
          if (r.Id == a) {
            console.log(r.Id);
            r.selected = true;
            this.selectedAll = this.listEmrDevice.every(r => r.selected)
          }
          if (!r.Id == a) {
            this.saveDeviceScreen()
          }
        })
      })
    }
  }
  getEmrEncounterList() {
    let params = { 'Id': this.userId, pageNo: this.pageNo, pageSize: 10 }
    this.emrService.getEmrEncounterListBy(params)
      .subscribe(res => {
        this.emrEncounterLists = res.Body.Data.Items;
      })
  }

  private getEmrDeviceList() {
    let params = { 'Id': this.userId, PageNo: 1, PageSize: 10 }
    this.emrService.getEmrDevice(params)
      .subscribe(deviceLists => {
        this.listEmrDevice = deviceLists.Body.Data.Items;
        console.log(this.listEmrDevice);
        this.listEmrDevice.map(dv => {
          dv.Udi = JSON.parse(dv.Udi);
        })
      })
  }

  selectAll() {
    for (var i = 0; i < this.listEmrDevice.length; i++) {
      this.listEmrDevice[i].selected = this.selectedAll;
    }
  }

  checkIfAllSelected() {
    this.selectedAll = this.listEmrDevice.every(item => item.selected)
  }

  selectAllEncounter() {
    for (var i = 0; i < this.emrEncounterLists.length; i++) {
      this.emrEncounterLists[i].selected = this.selectedAllEncounter;
    }
  }

  checkIfAllEncounterSelected() {
    this.selectedAllEncounter = this.emrEncounterLists.every(item => item.selected)
  }

  public allDropdown() {
    let params = { Id: "11,83,84,86", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.initializeSelectDropDown(res.Body.Data)
      })
  }

  setEffectivex() {
    var control = <FormArray>this.emrObservationdetailsForm.controls['Effectivex'];
    let info = JSON.parse(this.observationDetails.data.Effective);
    let index = 0; // or 1 or 2
    info.map(x => {
      control.push(this.FB.group({ EffectiveDateTime: new Date(x.EffectiveDateTime), EffectivePeriod: x.EffectivePeriod }))
    })
  }

  setValuex() {
    var control = <FormArray>this.emrObservationdetailsForm.controls['ValuexV'];
    let info = JSON.parse(this.observationDetails.data.Valuex);
    let index = 0; // or 1 or 2
    info.map(x => {
      control.push(this.FB.group({ ValueString: x.ValueString, ValueQuantity: x.ValueQuantity,ValueRange: x.ValueRange }))
    })
  }

  setComponent() {
    var control = <FormArray>this.emrObservationdetailsForm.controls['ComponentC'];
    let info = JSON.parse(this.observationDetails.data.Component);
    let index = 0; // or 1 or 2
    info.map(x => {
      control.push(this.FB.group({ CCode: x.CCode, Interpret: x.Interpret,DataAbsentReason: x.DataAbsentReason }))
    })
  }

}

