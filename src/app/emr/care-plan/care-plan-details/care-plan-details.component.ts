import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmrService } from '../../emr.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-care-plan-details',
  templateUrl: './care-plan-details.component.html',
  styleUrls: ['./care-plan-details.component.css']
})
export class CarePlanDetailsComponent implements OnInit {
  isActivities: boolean = false;
  activity: any;
  actDetails: any;
  actProduct: any;
  selectedActStatus: any;
  activeStatusType: any;
  selectedReasonCode: any;
  reasonCodeType: any;
  selectedProduct: any;
  productType: any;
  selectedCodeDrp: any;
  codeType: any;
  selectedOutcomeCodeableConcept: any;
  outcomeType: any;
  selectedCatDrp: any;
  categoryType: any;
  selectedCategory: any;
  selectedIntent: any;
  intentType: any;
  selectedStatus: any;
  statusType: any;
  sourceType: any;
  selectedText: any;
  @Input() CarePlanDetails: any;
  @Output() goListingPage: EventEmitter<any> = new EventEmitter();
  emrCarePlanDetailsForm: FormGroup;
  userId = Cookie.get('Id');
  msgs: any[];
  IsHidden: boolean = false;
  constructor(private FB: FormBuilder, private emrService: EmrService) { }

  ngOnInit() {
    this.CarePlanFormInit();
    this.getAllDropdowns();
  }

  backToListing() {
    this.goListingPage.emit('');
  }

  sourceTypeValidation() {
    this.emrCarePlanDetailsForm.get("SourceType").valueChanges.subscribe((val) => {
      if (val == "Imported from hospitalEMR") {
        this.emrCarePlanDetailsForm.get("SourceId").enable();
      }
      else {
        this.emrCarePlanDetailsForm.get("SourceId").disable();
      }
    });
  }

  private CarePlanFormInit() {
    // Edit
    if (this.CarePlanDetails) {
      let period = JSON.parse(this.CarePlanDetails.data.Period);
      this.activity = JSON.parse(this.CarePlanDetails.data.Activity);
       this.actDetails = this.activity.DetailParent;
      this.actProduct = this.actDetails.ProductParent;
      const actSchedule = this.actDetails.ScheduledParent;
      console.log(this.actDetails)
      this.emrCarePlanDetailsForm = this.FB.group({
        Id: this.CarePlanDetails.data.Id,
        PatientId: this.CarePlanDetails.data.PatientId,
        SourceType: [this.CarePlanDetails.data.SourceType, Validators.required],
        SourceId: [{ value: this.CarePlanDetails.data.SourceId, disabled: true }, Validators.required],
        Creator: [this.CarePlanDetails.data.CreatedBy, Validators.required],
        Definition: [this.CarePlanDetails.data.Definition, Validators.required],
        BasedOn: [this.CarePlanDetails.data.BasedOn, Validators.required],
        Replaces: [this.CarePlanDetails.data.Replaces, Validators.required],
        Appointment: this.CarePlanDetails.data.Appointment,
        PartOf: [this.CarePlanDetails.data.PartOf, Validators.required],
        Status: [this.CarePlanDetails.data.Status, Validators.required],
        Intent: this.CarePlanDetails.data.Intent,
        Category: this.CarePlanDetails.data.Category,
        Title: this.CarePlanDetails.data.Title,
        Description: this.CarePlanDetails.data.Description,
        Subject: this.CarePlanDetails.data.Subject,
        Context: this.CarePlanDetails.data.Context,
        Period: this.FB.group({
          PeriodFrom: period.PeriodFrom,
          PeriodTo:period.PeriodTo
        }),
        Author: this.CarePlanDetails.data.Author,
        CareTeam: this.CarePlanDetails.data.CareTeam,
        Addresses: this.CarePlanDetails.data.Addresses,
        SupportingInfo: this.CarePlanDetails.data.SupportingInfo,
        Goal: this.CarePlanDetails.data.Goal,
        ActivityParent: this.FB.group({
          Activity: this.activity.Activity,
          OutcomeCodeableConcept: this.activity.OutcomeCodeableConcept,
          outcomeReference: this.activity.outcomeReference,
          Progress: this.activity.Progress,
          Reference: this.activity.Reference,
          DetailParent: this.FB.group({
            Detail: this.actDetails.Detail,
            Definition: this.actDetails.Definition,
            Code: this.actDetails.Code,
            ReasonCode: this.actDetails.ReasonCode,
            ReasonReference: this.actDetails.ReasonReference,
            Goal: this.actDetails.Goal,
            Status: this.actDetails.Status,
            StatusReason: this.actDetails.StatusReason,
            Prohibited: this.actDetails.Prohibited,
            ScheduledParent: this.FB.group({
              Scheduled: actSchedule.Scheduled,
              ScheduledTiming: actSchedule.ScheduledTiming,
              ScheduledPeriod: actSchedule.ScheduledPeriod,
              ScheduledString: actSchedule.ScheduledString,
            }),
            Location: this.actDetails.Location,
            Performer: this.actDetails.Performer,
            ProductParent: this.FB.group({
              Product: this.actProduct.Product,
              ProductCodeableConcept: this.actProduct.ProductCodeableConcept,
              ProductReference: this.actProduct.ProductReference,
            }),
            DailyAmount: this.actDetails.DailyAmount,
            Quantity: this.actDetails.Quantity,
            Description: this.actDetails.Description,
          }),
        }),
        Note: this.CarePlanDetails.data.Note,
      });
      this.sourceTypeValidation();
      if (this.CarePlanDetails.mode == 'readOnly') {
        this.emrCarePlanDetailsForm.disable();
      }
    }
    else {
      this.emrCarePlanDetailsForm = this.FB.group({
        Id: 0,
        PatientId: this.userId,
        SourceType: ['', Validators.required],
        SourceId: [{ value: '', disabled: true }],
        Creator: this.userId,
        Definition: [null, Validators.required],
        BasedOn: [null, Validators.required],
        Replaces: [null, Validators.required],
        PartOf: [null, Validators.required],
        Status: ['', Validators.required],
        Intent: null,
        Category: null,
        Title: [null],
        Description: null,
        Subject: null,
        Context: null,
        Period: this.FB.group({
          PeriodFrom: null,
          PeriodTo:null  
        }),
        Author: null,
        CareTeam: null,
        Addresses: null,
        SupportingInfo: null,
        Goal: null,
        ActivityParent: this.FB.group({
          Activity: null,
          OutcomeCodeableConcept: null,
          outcomeReference: null,
          Progress: null,
          Reference: null,
          DetailParent: this.FB.group({
            Definition: null,
            Code: null,
            ReasonCode: null,
            ReasonReference: null,
            Goal: null,
            Status: null,
            StatusReason: null,
            Prohibited: null,
            ScheduledParent: this.FB.group({
              Scheduled: null,
              ScheduledTiming: null,
              ScheduledPeriod: null,
              ScheduledString: null,
            }),
            Location: null,
            Performer: null,
            ProductParent: this.FB.group({
              Product: null,
              ProductCodeableConcept: null,
              ProductReference: null,
            }),
            DailyAmount: null,
            Quantity: null,
            Description: null,
            Detail: null,
          }),
        }),
        Note: null,
      });
      this.sourceTypeValidation();
    }
  }

  saveEmrCarePlan() {
    let addParams = this.emrCarePlanDetailsForm.value;
    addParams.Period = JSON.stringify(addParams.Period);
    console.log(addParams);
    // let from = new DatePipe('en').transform(addParams.Period[0], 'yyyy-MM-dd');
    // let to = new DatePipe('en').transform(addParams.Period[1], 'yyyy-MM-dd');
    // addParams.Period = { from, to };
    this.emrService.addEmrCarePlan(addParams).subscribe(res => {
      if (res.Header.Success) {
        this.showSuccess(res.Header.Message)
        setTimeout(() => {
          this.backToListing();
        }, 1000);
      }
    })
  }

  updateEmrCarePlan() {
    let updateParams = this.emrCarePlanDetailsForm.value;
    updateParams.Period = JSON.stringify(updateParams.Period);
    this.emrService.updateEmrCarePlan(updateParams).subscribe(res => {
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

  getAllDropdowns() {
    if(this.CarePlanDetails) {
    this.selectedText = this.CarePlanDetails.data.SourceType;
    this.selectedStatus = this.CarePlanDetails.data.Status;
    this.selectedIntent = this.CarePlanDetails.data.Intent;
    this.selectedCategory = this.CarePlanDetails.data.Category;
    this.selectedOutcomeCodeableConcept = this.activity.OutcomeCodeableConcept;
    this.selectedCodeDrp =this.actDetails.Code;
    this.selectedProduct = this.actProduct.Product;
    this.selectedReasonCode = this.actDetails.ReasonCode;
    this.selectedActStatus = this.actDetails.Status;
    }
    console.log(this.selectedCodeDrp );
  }

  searchDropDown(Id, desc) {
    let params = { Id, desc: desc }
    this.emrService.getDropDown(params)
      .subscribe((res) => {
        this.IsHidden = true;
        this.sourceType = res.Body.Data.filter(r => r.CategoryId == '11');
        this.statusType = res.Body.Data.filter(r => r.CategoryId == '56');
        this.intentType = res.Body.Data.filter(r => r.CategoryId == '122');
        this.categoryType = res.Body.Data.filter(r => r.CategoryId == '123');
        this.outcomeType = res.Body.Data.filter(r => r.CategoryId == '58');
        this.codeType = res.Body.Data.filter(r => r.CategoryId == '61');
        this.productType = res.Body.Data.filter(r => r.CategoryId == '131');
        this.reasonCodeType = res.Body.Data.filter(r => r.CategoryId == '128');
        this.activeStatusType = res.Body.Data.filter(r => r.CategoryId == '130');
      })
      console.log(this.productType);
  }
  
  getValue(item) {
    this.IsHidden = false;
    if (item.CategoryId == 11) {
      this.selectedText = item.Description;
    }
    if (item.CategoryId == 56) {
      this.selectedStatus = item.Description;
    }
    if (item.CategoryId == 122) {
      this.selectedIntent = item.Description;
    }
    if (item.CategoryId == 123) {
      this.selectedCategory = item.Description;
    }
    if (item.CategoryId == 58) {
      this.selectedOutcomeCodeableConcept = item.Description;
    }
    if (item.CategoryId == 61) {
      this.selectedCodeDrp = item.Description;
    }
    if (item.CategoryId == 128) {
      this.selectedReasonCode= item.Description;
    }
    if (item.CategoryId == 130) {
      this.selectedActStatus = item.Description;
    }
    if(item.CategoryId == 131) {
      this.selectedProduct = item.Description;
    }
  }
  
  showActivityDetails() {
    this.isActivities = true;
  }
}