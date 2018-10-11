import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { DatePipe } from '@angular/common';
import { DeviceDropDown, DeviceSelectDropDown } from './device-details.models';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  isReadOnly: boolean = false;
  selectedtype: any;
  selectedstatus: any;
  selectedentryType: any;
  selectedText: any;
  @Input() deviceDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();

  public deviceDropdown: DeviceDropDown = <DeviceDropDown>{};
  public deviceSelectDropdown: DeviceSelectDropDown = <DeviceSelectDropDown>{};
  public emrDevicedetailsForm: FormGroup;
  public msgs: any[];
  public IsHidden: boolean = false;
  private userId = Cookie.get('Id');
  public dateTime = new Date();
  public minSDate: Date = new Date(Date.now());

  constructor(private FB: FormBuilder, private emrService: EmrService) { 
    this.dateTime.setDate(this.dateTime.getDate());
  }

  ngOnInit() {
    this.deviceFormInit();
    this.sourceTypeValidation();
    this.getAllDropdowns();
    this.allDropDown();
  }

  backToListing(evt) {
    this.goListingPage.emit(evt);
    this.sourceTypeValidation();
  }

  public saveEmrDevice() {
    let addParams = this.emrDevicedetailsForm.value;
    addParams.SourceType = addParams.SourceType ? addParams.SourceType : 0;
    addParams.Udi = JSON.stringify(addParams.Udi);
    addParams.ManufactureDate = new DatePipe('en').transform(addParams.ManufactureDate, 'yyyy-MM-dd HH:mm:ss');
    addParams.ExpirationDate = new DatePipe('en').transform(addParams.ExpirationDate, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.addEmrDevice(addParams).subscribe(res => {
      console.log(res);
      this.successMessagePopUp(res);
    })
  }

  public updateEmrDevice() {
    let updateParams = this.emrDevicedetailsForm.value;
    updateParams.Udi = JSON.stringify(updateParams.Udi);
    updateParams.ManufactureDate = new DatePipe('en').transform(updateParams.ManufactureDate, 'yyyy-MM-dd HH:mm:ss');
    updateParams.ExpirationDate = new DatePipe('en').transform(updateParams.ExpirationDate, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.updateEmrDevice(updateParams).subscribe(res => {
      this.successMessagePopUp(res)
    })
  }

  public searchDropDown(Id, desc) {
    let params = { Id, desc: desc }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        if (res.Body.Data == '') {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'There is no values for this character, please enter other character' }];
        }
        var data = res.Body.Data.filter(
          item => item.Description.toLowerCase().indexOf(desc.toLowerCase()) == 0
        );
        this.IsHidden = true;
        this.initializeDropDown(data)
      })
  }

  public getAllDropdowns() {
    if (this.deviceDetails) {
      this.selectedtype = this.deviceDetails.data.Type;
    }
  }

  public getValue(item) {
    this.IsHidden = false;
    if (item.CategoryId == 143) {
      this.selectedtype = item.Description;
    }
  }


  private deviceFormInit() {
    //Add
    if (!this.deviceDetails) {
      this.emrDevicedetailsForm = this.FB.group({
        ID: 0,
        PatientId: this.userId,
        SourceType: ['', Validators.required],
        SourceId: [{ value: 0, disabled: true }],
        CreatedBy: this.userId,
        Udi: this.FB.group({ DeviceIdentifier: [null, Validators.required], Name: [null, Validators.required], Jurisdiction: [null, Validators.required], CarrierHRF: [null, Validators.required], CarrierAIDC: null, EntryType: null }),
        Status: ['', Validators.required],
        Type: ['', Validators.required],
        LotNumber: null,
        Manufacturer: null,
        ManufactureDate: null,
        ExpirationDate: null,
        Model: null,
        Version: null,
        Patient: null,
        Owner: [null, Validators.required],
        Contact: null,
        Location: null,
        Url: null,
        Note: null,
        Safety: null,
      });
      this.emrDevicedetailsForm.get('SourceType').setValue('202');
    } else {
      // edit
      let udi = this.deviceDetails.data.Udi;
      this.isReadOnly = true;
      this.emrDevicedetailsForm = this.FB.group({
        Id: this.deviceDetails.data.Id,
        PatientId: this.deviceDetails.data.PatientId,
        SourceType: [this.deviceDetails.data.SourceType, Validators.required],
        SourceId: [{ value: this.deviceDetails.data.SourceId, disabled: true }],
        CreatedBy: this.userId,
        Udi: this.FB.group({ DeviceIdentifier: [udi.DeviceIdentifier, Validators.required], Name: [udi.Name, Validators.required], Jurisdiction: [udi.Jurisdiction, Validators.required], CarrierHRF: [udi.CarrierHRF, Validators.required], CarrierAIDC: udi.CarrierAIDC, EntryType: udi.EntryType }),
        Status: [this.deviceDetails.data.Status, Validators.required],
        Type: [this.deviceDetails.data.Type, Validators.required],
        LotNumber: [this.deviceDetails.data.LotNumber],
        Manufacturer: [this.deviceDetails.data.Manufacturer],
        ManufactureDate: this.deviceDetails.data.ManufactureDate ? new Date(this.deviceDetails.data.ManufactureDate) : null,
        ExpirationDate: this.deviceDetails.data.ExpirationDate ? new Date(this.deviceDetails.data.ExpirationDate) : null,
        Model: this.deviceDetails.data.Model,
        Version: this.deviceDetails.data.Version,
        Patient: this.deviceDetails.data.Patient,
        Owner: [this.deviceDetails.data.Owner,Validators.required],
        Contact: this.deviceDetails.data.Contact,
        Location: this.deviceDetails.data.Location,
        Url: this.deviceDetails.data.Url,
        Note: this.deviceDetails.data.Note,
        Safety: this.deviceDetails.data.Safety,
      });
      if (this.deviceDetails.data.SourceType == "203") {
        this.emrDevicedetailsForm.get("SourceId").enable();
      }
      else {
        this.emrDevicedetailsForm.get("SourceId").disable();
      }
      if (this.deviceDetails.mode == 'readOnly') {
        this.emrDevicedetailsForm.disable();
      }
    }
  }

  private sourceTypeValidation() {
    this.emrDevicedetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      if (val == "203")
        this.emrDevicedetailsForm.get("SourceId").enable();
      else
        this.emrDevicedetailsForm.get("SourceId").disable();
    });
  }

  private successMessagePopUp(res) {
    if (res.Header.Success) {
      this.showSuccess(res.Header.Message)
      setTimeout(() => {
        this.backToListing('getAPI');
      }, 1000);
    }
  }

  private showSuccess(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success', detail: msg });
  }

  private initializeAllDropDown(data) {
    this.deviceDropdown = <DeviceDropDown>{
      sourceTypes: data.filter(r => r.CategoryId == '11'),
      entryType: data.filter(r => r.CategoryId == '141'),
      status: data.filter(r => r.CategoryId == '142'),
    };
  }

  private initializeDropDown(data) {
    this.deviceSelectDropdown = <DeviceSelectDropDown>{
      type: data.filter(r => r.CategoryId == '143'),
    };
  }

  private allDropDown() {
    let params = { Id: "11,141,142", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.initializeAllDropDown(res.Body.Data);
        console.log(res.Body.Data);
      })
  }
}

