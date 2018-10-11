import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit {

  min: any;
  isReadOnly: boolean = false;
  emptyDropdown: any;
  time: any;
  selectedServiceType: any;
  error: string;
  selectedReason: any;
  selectedType: any;
  selectedSpecialty: any;
  selectedServiceCat: any;
  selectedStatus: any;
  selectedText: any;
  appointmentReason: any;
  appointmentType: any;
  appointmentSpeciality: any;
  appointmentServiceType: any;
  appointmentServiceCat: any;
  appointmentSrcType: any;
  public yesterday = new Date();

  startDate: any;
  @Input() appointmentDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  emrAppointmentdetailsForm: FormGroup;
  userId = Cookie.get('Id');
  msgs: any[];
  sourceTypes: any;
  appointmentStatus: any;
  IsHidden: boolean = false;
  constructor(private FB: FormBuilder, private emrService: EmrService) {
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngOnInit() {
    console.log(this.appointmentDetails);
    this.appointmentFormInit();
    this.sourceTypeValidation();
    this.getAllDropdowns();
    this.allDropDown();
  }

  backToListing(evt) {
    this.goListingPage.emit(evt);
  }

  sourceTypeValidation() {
    this.emrAppointmentdetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      if (val == "203")
        this.emrAppointmentdetailsForm.get("SourceID").enable();
      else
        this.emrAppointmentdetailsForm.get("SourceID").disable();
    });
  }


  appointmentFormInit() {
    // Edit
    this.emrAppointmentdetailsForm = this.FB.group({
      Identifier: 0,
      SourceType: ['', Validators.required],
      SourceID: [{ value: '', disabled: true }, Validators.required],
      Creator: this.userId,
      Status: ['', Validators.required],
      ServiceCategory: [null, Validators.required],
      ServiceType: [null, Validators.required],
      Specialty: [null, Validators.required],
      AppointmentType: [null, Validators.required],
      Reason: null,
      Priority: [null, Validators.required],
      Description: [null, Validators.required],
      Start: null,
      End: null,
      MinutesDuration: null,
      Slot: null,
      PatientID: this.userId,
      Comment: null,
      IncomingReferral: null,
      RequestedPeriod: null,
    });
    this.emrAppointmentdetailsForm.get('SourceType').setValue('202');
    if (this.appointmentDetails) {
      console.log(this.appointmentDetails.data.Status);
      this.isReadOnly = true;
      this.emrAppointmentdetailsForm = this.FB.group({
        Identifier: this.appointmentDetails.data.Identifier,
        SourceType: [this.appointmentDetails.data.SourceType, Validators.required],
        SourceID: [{ value: this.appointmentDetails.data.SourceID, disabled: true }],
        Creator: [this.appointmentDetails.data.CreatedBy, Validators.required],
        Status: [this.appointmentDetails.data.STATUS, Validators.required],
        ServiceCategory: [this.appointmentDetails.data.ServiceCategory, Validators.required],
        ServiceType: [this.appointmentDetails.data.ServiceType, Validators.required],
        Specialty: [this.appointmentDetails.data.Specialty, Validators.required],
        AppointmentType: [this.appointmentDetails.data.AppointmentType, Validators.required],
        Reason: this.appointmentDetails.data.Reason,
        Priority: [this.appointmentDetails.data.Priority, Validators.required],
        Description: [this.appointmentDetails.data.Description, Validators.required],
        Start: this.appointmentDetails.data.Start ? new Date(this.appointmentDetails.data.Start) : null,
        End: this.appointmentDetails.data.END ? new Date(this.appointmentDetails.data.END) : null,
        MinutesDuration: this.appointmentDetails.data.MinutesDuration,
        Slot: this.appointmentDetails.data.Slot,
        PatientID: this.appointmentDetails.data.PatientID,
        Comment: this.appointmentDetails.data.Comment,
        IncomingReferral: this.appointmentDetails.data.IncomingReferral,
        RequestedPeriod: this.appointmentDetails.data.RequestedPeriod,
      });
      if (this.appointmentDetails.data.SourceType === "203") {
        this.emrAppointmentdetailsForm.get("SourceID").enable();
      }
      else {
        this.emrAppointmentdetailsForm.get("SourceID").disable();
      }
      if (this.appointmentDetails.mode == 'readOnly') {
        this.emrAppointmentdetailsForm.disable();
      }
      this.calculateTime();
    }
  }

  getAllDropdowns() {
    if (this.appointmentDetails) {
      this.selectedReason = this.appointmentDetails.data.Reason;
      this.selectedType = this.appointmentDetails.data.AppointmentType;
      this.selectedSpecialty = this.appointmentDetails.data.Specialty;
      this.selectedServiceCat = this.appointmentDetails.data.ServiceCategory;
      this.selectedStatus = this.appointmentDetails.data.Status;
      this.selectedText = this.appointmentDetails.data.SourceType;
      this.selectedServiceType = this.appointmentDetails.data.ServiceType;
    }
  }

  saveEmrAppointment() {
    let addParams = this.emrAppointmentdetailsForm.value;
    let startTime = new DatePipe('en');
    addParams.Start = startTime.transform(addParams.Start, "yyyy-MM-dd HH:mm:ss ");
    addParams.End = new DatePipe('en').transform(addParams.End, 'yyyy-MM-dd HH:mm:ss');
    console.log(addParams.Start);
    this.emrService.addEmrAppointmentListBy(addParams).subscribe(res => {
      if (res.Header.Success) {
        if (res.Header.Success) {
          console.log('updated');
          this.showSuccess(res.Header.Message)
          setTimeout(() => {
            this.backToListing('getAPI');
          }, 1000);
        }
      }
    })
  }

  updateEmrAppointment() {
    let updateParams = this.emrAppointmentdetailsForm.value;
    updateParams.Start = new DatePipe('en').transform(updateParams.Start, 'yyyy-MM-dd HH:mm:ss');
    updateParams.End = new DatePipe('en').transform(updateParams.End, 'yyyy-MM-dd HH:mm:ss');
    this.emrService.updateEmrAppointmentListBy(updateParams).subscribe(res => {
      if (res.Header.Success) {
        this.showSuccess(res.Header.Message)
        setTimeout(() => {
          this.backToListing('getAPI');
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
        var data = res.Body.Data.filter(
          item => item.Description.toLowerCase().indexOf(desc.toLowerCase()) == 0
        );
        if (data == "") {
          this.msgs = [{ severity: 'error', summary: 'Error Message', detail: 'There is no values for this character, please enter other character' }];
        }
        this.IsHidden = true;
        this.appointmentServiceCat = data.filter(r => r.CategoryId == '159');
        this.appointmentSpeciality = data.filter(r => r.CategoryId == '160');
        this.appointmentReason = data.filter(r => r.CategoryId == '162');
        this.appointmentServiceType = data.filter(r => r.CategoryId == '173');
      })
  }

  getValue(item) {
    this.IsHidden = false;
    console.log(item);
    if (item.CategoryId == 159) {
      this.selectedServiceCat = item.Description;
    }
    if (item.CategoryId == 160) {
      this.selectedSpecialty = item.Description;
    }
    if (item.CategoryId == 162) {
      this.selectedReason = item.Description;
    }
    if (item.CategoryId == 173) {
      this.selectedServiceType = item.Description;
    }
  }

  calculateTime() {
    let addParams = this.emrAppointmentdetailsForm.value;
    if (addParams.End != null) {
      if (Math.ceil((addParams.End - addParams.Start) / 60000) > 0) {
        addParams.MinutesDuration = Math.ceil((addParams.End - addParams.Start) / 60000);
        this.min =  addParams.MinutesDuration;
        this.error = "";
      } else {
        this.error = "End Time must be greater than Start time";
      }
    }
  }

  private allDropDown() {
    let params = { Id: "11,158,161", desc: null }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.sourceTypes = res.Body.Data.filter(r => r.CategoryId == '11');
        this.appointmentStatus = res.Body.Data.filter(r => r.CategoryId == '158');
        this.appointmentType = res.Body.Data.filter(r => r.CategoryId == '161');
      })
  }
}
